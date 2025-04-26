import path from 'path';
import fs from 'fs/promises';
import axios from "axios";

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
    return { filePath,filename, year, month };
}

export { createSlug, CountryInfo, CreateDir, GenerateFileName }