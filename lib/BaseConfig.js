import path from 'path';
import fs from 'fs/promises';
import axios from "axios";
import { CartSchema } from '@/Models/CartModel';
import CryptoJS from 'crypto-js';
const PASSWORD_SALT = process.env.PASSWORD_SALT;

const createSlug = (name) => {
    return name
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};


const CountryInfo = async (ip) => {
    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        const { country_name, city } = response.data;
        return {
            Country: country_name || null,
            City: city || null,
        };
    } catch (error) {
        return { Country: null, City: null };
    }
};

const CreateDir = async () => {
    const now = Date.now();
    const date = new Date(now);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const uploadDir = path.join(process.cwd(), 'public/Media/Images', year, month);

    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    return { uploadDir, timestamp: now, year, month };
};

const GenerateFileName = async (file) => {
    const { uploadDir, timestamp, year, month } = await CreateDir();
    const randomString = Math.random().toString(36).substring(2, 8);
    const sanitizedOriginalName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
    const fileExtension = path.extname(file.name);
    const filename = `${timestamp}-${sanitizedOriginalName}-${randomString}${fileExtension}`;
    const filePath = path.join(uploadDir, filename);
    return { filePath, filename, year, month };
}


const CalculateTotalPrice = async (UserID) => {
    let Cart = await CartSchema.findOne({ UserID })
        .populate({
            path: 'CartItems',
            match: { Status: 'Active' },
            populate: {
                path: 'ProductID',
                model: "Products",
            }
        });

    let ProductTotal = 0;
    let CartTotal = 0;

    Cart.CartItems.forEach(Item => {
        if (Item.ProductID && Item.ProductID.Price) {
            ProductTotal += Item.ProductID.Price * Item.Quantity;
        }
        if (Item.Price) {
            CartTotal += Item.Price * Item.Quantity;
        }
    });
    return { ProductTotal, CartTotal };
};


function encryptPassword(Password) {
    const [iv, salt] = [16, 16].map(() => CryptoJS.lib.WordArray.random(16));
    const key = CryptoJS.PBKDF2(PASSWORD_SALT, salt, {
        keySize: 8,
        iterations: 1000
    });
    return CryptoJS.enc.Base64.stringify(
        salt.concat(iv).concat(
            CryptoJS.AES.encrypt(Password, key, { iv }).ciphertext
        )
    );
}

function decryptPassword(Password) {
    const combined = CryptoJS.enc.Base64.parse(Password);
    const [salt, iv, ciphertext] = [
        combined.words.slice(0, 4),
        combined.words.slice(4, 8),
        combined.words.slice(8)
    ].map(slice => CryptoJS.lib.WordArray.create(slice));

    return CryptoJS.AES.decrypt(
        { ciphertext },
        CryptoJS.PBKDF2(PASSWORD_SALT, salt, { keySize: 256 / 32, iterations: 1000 }),
        { iv }
    ).toString(CryptoJS.enc.Utf8);
}

export { createSlug, CountryInfo, CreateDir, GenerateFileName, CalculateTotalPrice, decryptPassword, encryptPassword }