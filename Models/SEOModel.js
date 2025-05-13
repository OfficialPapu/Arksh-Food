import mongoose from 'mongoose';

let SEOSchema = new mongoose.Schema({
    PageName: {
        type: String,
        required: true,
        enum: ['Home', 'about', 'contact', 'search', 'faq', 'terms', 'privacy'],
    },
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Keywords: {
        type: [String],
        default: [],
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' } })

SEOSchema = mongoose.models.SEO || mongoose.model('SEO', SEOSchema, 'SEO');

export default SEOSchema;
