const express = require('express');
const router = express.Router();
const productModel = require('../models/products')

//endpoints to create a product

router.post('/create', (req, res) => {
    const newProductModel = new productModel({
      ...req.body,
    });
  
    newProductModel.save()
      .then((product) => {
        res.json({message:"Product Added Successfully",success:true,product});
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });

// endpoint to fetch all products
router.get('/',(req,res)=>{
    productModel.find()
    .then((product)=>{
        res.status(201).json({message:"All Products Loaded Successfully", success:true, product});
    })
    .catch((err)=>{
        res.status(400).send({message: "Product Found failed", success: false});
    })
});

// endpoints to fetch single product
router.get('/:id',(req,res)=>{
    productModel.findById(req.params.id)
    .then((product)=>{
        if(!product){
            res.send({message:"Product Not Found", success:false})
        }else{
            res.send({message: "Product Found Successfully", success: true, product})
        }
    })
    .catch((err)=>{
        res.status(500).send('Internal Server Error');
    })
});

//endpoint to update single product

router.put('/:id', (req,res)=>{
    productModel.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    .then((product)=>{
        if(!product){
            res.send({message:"Product Not Found", success:false})
        }else{
            res.send({message: "Product Updated Successfully", success: true, product})
        }
    })
    .catch((err)=>{
        res.status(500).send('Internal Server Error');
    })
})


// endpoints to delete single products 

router.delete('/:id',(req,res)=>{
    productModel.findByIdAndDelete(req.params.id)
    .then((product)=>{
        res.status(201).send({message:"Product Deleted", success:true, product});
    })
    .catch((err)=>{
        res.status(400).send({message: "Product Not Deleted", success: false});
    })
})
module.exports = router