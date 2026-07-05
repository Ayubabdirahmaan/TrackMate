import Transaction from '../model/Transaction.js'

export const createTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({ ...req.body, createdBy: req.user._id })
        res.status(201).json(transaction)
    } catch (error) {
        next(error)
    }
}