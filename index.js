import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world this page test')
})

app.listen(PORT, ()=> {
    console.log(`server is runing on https://localhost:5000 ${PORT}`);
})