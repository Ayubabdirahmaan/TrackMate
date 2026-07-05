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