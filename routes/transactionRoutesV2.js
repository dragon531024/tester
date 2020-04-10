const express = require('express')
const router = express.Router()

const Transaction = require('../models/transactionModel.js')

//MongoDB Atlas connection setting
const mongoose = require('mongoose')
const connStr = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PWD)
mongoose.connect(connStr, { useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false })
const db = mongoose.connection
db.on('error', () => console.log('Connection ERROR!!!'))
db.once('open', () => console.log('Database CONNECTED!!!'))

router.get('/api/v2/transactions', async (req,res,next) => {
    try{
        const transactions = await Transaction.find()
        res.status(200).json(transactions)
    } catch(error){
        res.status(500).json({error: error.message})
    }
})

router.put('/api/v2/transactions/:id', async(req,res) => {
    const update_t = {
        name: req.body.name,
        amount: Number(req.body.amount),
        update: new Date()
    }
    try {
        const t = await Transaction.findbyIdAndUpdate(req.params.id, update_t, {new: true})
        if (!t){
            res.status(404).json({error: ' UPDATE::transaction not found!!!'})
        }else{
        res.status(200).json(t)
    }
    } catch (error) {
        res.status(500).json({error:'UPDATE::'+error.message})
    }
})

router.delete('/api/v2/transactions/:id', async (req,res) => {
    try {
        const t = await Transaction.findByIdAndDelete(req.params.id)
            res.status(200).json({message: 'transaction Deleted!!'})
    } catch (error) {
        res.status(500).json({error: 'DELETE::transaction not found'})
    }
})

router.get('/api/v2/transactions/:id', async(req,res,next) => {
    try {
        const t = await Transaction.findById(req.params.id)
        if (!t) {
             res.status(404).json({error:'transactioni not found'})
        }
        res.status(202).json(t)
    } catch (error) {
        res.status(500).json({error: 'GET::error'})
    }
})

router.post('/api/v2/transactions/', async (req,res) => {
    const name = req.body.name
    const amount = req.body.amount

    const date = new Date()
    const t = new Transaction(req.body)

    try {
        await t.save()
        res.status(200).json(t)
    } catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router