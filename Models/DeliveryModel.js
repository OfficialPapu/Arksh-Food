const mongoose = require('mongoose');

let DeliverySchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    AddressName: {
        type: String,
    },
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Country: {
        type: String,
    },
    PostalCode: {
        type: String,
    },
    WhatsApp: {
        type: String,
    },
    Notes: {
        type: String
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

DeliverySchema = mongoose.models.Deliverys || mongoose.model("Deliverys", DeliverySchema, "Deliverys");
export default DeliverySchema;