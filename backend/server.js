const express =require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express();

//middleware
app.use(cookieParser())
app.use(express.json());
app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
        res.setHeader("Access-Control-Allow-Headers", "*"),
        next()
} )
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}))
const PORT = process. env. PORT || 8080  

app.use('/user', require('./routes/userRoutes'))
app.use('/product', require('./routes/ProductsRoutes'))
app.use('/api', require('./routes/uploadImageRoute'))

app.use('/order', require('./routes/orderRoutes'))


//api routes
app.get('/', (req,res)=> {
    res.json({message: "wer're clear"})
})



//DB
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('Connected to DB'))



//listen to port
app.listen(PORT, ()=> console.log(`now listen to port ${PORT}`))
