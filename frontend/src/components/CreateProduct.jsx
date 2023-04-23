import React, { useRef, useState } from "react";
import {Link} from 'react-router-dom';
const CreateProduct = () => {
    
    let resetForm = useRef();
    // creating empty variable to store values after reading using readValue function below
    let products = {};

    function readValues(property,value){
        products[property]=value;
        console.log(products);
    }

    // adding values stored inside products variable line-5  into backend db

    function addProduct(){
        fetch('http://localhost:8000/product/create',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(products)
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            resetForm.current.reset();
                // alert(data.message)
        })
        .catch((err)=>{console.log(err);})
    }
    
  return (
    <>
      <header className="bg-info text-center">
        <h2 className="py-2">Product Management System</h2>
      </header>
      <div className="container w-100">
        <div className="header bg-light p-3 d-flex justify-content-between align-items-center">
            <h3>Add New Product</h3>
            <Link to={'/viewproduct'}>
            <button className="btn btn-info">View Product</button>
            </Link>
        </div>

        <form className="container d-flex flex-column gap-3 mt-3" ref={resetForm}>
            {/* <input type="number" className="form-control" placeholder="Enter id" onChange={(e)=>{
                readValues('id',Number(e.target.value))
            }}/> */}
            <input type="text" className="form-control" placeholder="Enter name" onChange={(e)=>{
                readValues('name',e.target.value)
            }}/>
            <input type="number" className="form-control" placeholder="Enter price" onChange={(e)=>{
                readValues('price',Number(e.target.value))
            }}/>
            <input type="number" className="form-control" placeholder="Enter quantity" onChange={(e)=>{
                readValues('quantity',Number(e.target.value))
            }}/>
            <button className="btn btn-info w-100" onClick={()=>{
                addProduct();
                console.log("called")
            }}>Add Product</button>
            {/* <div className="message-container  w-100  bg-success text-white text-center text-uppercase">
                <p className="mt-3" style={{fontSize:"20px"}}>Product Added Successfully</p>
            </div> */}
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
