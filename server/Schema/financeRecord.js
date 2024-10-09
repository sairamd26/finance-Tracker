import mongoose from "mongoose";



const financeRecordSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },
});

const financeRecordModel = mongoose.model("FinanceRecords",financeRecordSchema);

export default financeRecordModel;