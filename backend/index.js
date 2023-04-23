const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/product');
const app = express();


//middlewares
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/pmsreact', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((data)=>{
    console.log("Successfully Connected to MongoDB");
})
.catch((err)=>{
    console.log(err, "error in mongodb conncetion");
})

app.use('/product',productRouter)

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Successfully Connected To Server at port",port);
})

