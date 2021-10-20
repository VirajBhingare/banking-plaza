require('dotenv').config({path: './.env'})
const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
connectToMongo()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/customers', require('./routes/view_customers'))
app.use('/api/transfer', require('./routes/transfer'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
}

app.listen(port, () => {
  console.log(`Banking Plaza app listening at http://localhost:${port}`)
})