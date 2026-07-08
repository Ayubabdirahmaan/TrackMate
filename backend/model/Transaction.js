import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        amount: { type: Number, require: true, min : 0 },
        type: {
            type: String, enum: ["expense", "income"], require: true
        },
        category: { type: String, required: true },
        transactionDate: Date,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
