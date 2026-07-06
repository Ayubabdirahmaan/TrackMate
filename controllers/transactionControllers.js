import Transaction from '../model/Transaction.js'

export const createTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({ ...req.body, createdBy: req.user._id })
        res.status(201).json(transaction)
    } catch (error) {
        next(error)
    }
}
export const getTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.find({ createdBy: req.user._id }).sort({ createdBy: -1 })
        res.json(transaction)

    } catch (error) {
        next(error)
    }
}


export const updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, req.body, { new: true })
        if (!transaction) return res.status(404).json('Transaction not found')
        res.json(transaction)
    } catch (error) {
        next(error)
    }
}

export const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id })
        if (!transaction) return res.status(404).json("Trasnaction not found")
        res.json({ message: 'Task Deleted' })
    } catch (error) {
        next(error)
    }
}
export const getMonthlySummary = async (req, res, next) => {
    try {
        const now = new Date();
        const year = Number(req.query.year) || now.getFullYear();
        const month = Number(req.query.month) || (now.getMonth() + 1);

        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);

        const summary = await Transaction.aggregate([
            {
                $match: {
                    createdBy: req.user._id,
                    createdAt: {
                        $gte: start,
                        $lt: end,
                    },
                },
            },

            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
        ]);
        console.log("summary desc: ", summary)

        let income = 0;
        let expense = 0;

        summary.forEach((item) => {
            if (item._id === "income") income = item.total;
            if (item._id === "expense") expense = item.total;
        });

        res.json({
            income,
            expense,
            balance: income - expense,
            totalTransactions: income + expense,
        });
    } catch (error) {
        next(error);
    }
};