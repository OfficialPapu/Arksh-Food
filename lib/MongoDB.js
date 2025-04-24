import mongoose from "mongoose";
const ConnectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
    } catch (error) {
        process.exit(1);
    }
}
ConnectDB();