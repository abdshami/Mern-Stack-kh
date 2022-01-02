
const express = require('express')
const app = express()

require("dotenv").config();
const bodyParser =require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const cors = require('cors')

//const expressValidator =  require('express-validator')

//routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

//enviroment constsants



//mongodb connection 
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.elqgl.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
        ).then( ()=> {
    console.log('Database Connected')
})

//middlewares



app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use(cors())


//app.use(expressValidator())

// app.get('/', (req,res,next) => {
//     res.status(200).json({ message: `Hello from server`})
// })


  
// app.post('/data', (req,res,next) => {
//     res.status(200).json({ 
//         msssage: req.body
//     })
// })



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})