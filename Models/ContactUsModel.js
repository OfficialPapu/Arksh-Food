import mongoose from 'mongoose';
let ContactUsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    Phone: {
        type: String,
        trim: true
    },
    Subject: {
        type: String,
        required: true,
        trim: true
    },
    Message: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' } })

ContactUsSchema = mongoose.models.ContactUs || mongoose.model('ContactUs', ContactUsSchema, 'ContactUs');

export default ContactUsSchema;