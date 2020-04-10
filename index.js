require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

//MongoDB Atlas connection string
//mongodb+srv://dragonbebo1:<password>@cluster0-2ondk.gcp.mongodb.net/test?retryWrites=true&w=majority

const app = express()

//middleware section
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//import transactions router V1
const RouterV1 = require('./routes/transactionRoutesV1')
app.use(RouterV1)

//import transactions router V2
const RouterV2 = require('./routes/transactionRoutesV2')
app.use(RouterV2)

const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME
app.listen(PORT, HOSTNAME, () => {
    console.log('Server is listenning at: '+HOSTNAME+': '+PORT)
})