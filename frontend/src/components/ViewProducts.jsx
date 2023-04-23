import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaPenAlt, FaTrashAlt, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  let [messagePopup, setMessagePopup] = useState(false);
  let [message, setMessage] = useState({ text: "Dummy", class: "success" });
  let [modalVisible, setModalVisible] = useState(false); // to toggle modal
  let [products, setProducts] = useState([]); // stores all products from setProducts line 13
  let product = useRef({});
  //fetching all products and store it in products
  useEffect(() => {
    fetch("http://localhost:8000/product/")
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        setProducts(response.product); // this product is from backend response
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // delete product
  function deleteProduct(prod_id, prod_index) {
    fetch(`http://localhost:8000/product/${prod_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.success === true) {
          let tempProducts = [...products];
          tempProducts.splice(prod_index, 1);
          setProducts(tempProducts);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function to setup update form data

  function setupUpdate(pro) {  // pro is all products from map function at add new products
    setModalVisible(true);
    product.current = pro;
  }

  //reading update form values

  function readValue(property, value) {
    product.current[property] = value;
    // console.log(product.current);
  }

  function updateProduct() {
    fetch(`http://localhost:8000/product/${product.current._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product.current)
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.success === true) {
          setMessagePopup(true);
          setMessage({ text: response.message, class: 'success' })
        }
        else {
          setMessagePopup(true);
          setMessage({ text: response.message, class: 'error' })
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      {/* update modal */}

      {
        modalVisible === true ?
          (
            <div className="updateModalContainer">
              <div className="updateModalForm">
                <div className="header rounded-3 bg-light p-3 d-flex justify-content-between align-items-center">
                  <h3>Update Product</h3>
                  <FaWindowClose className="icon" onClick={() => { setModalVisible(false) }} />
                </div>
                <form className="container d-flex flex-column gap-3 mt-3 p-2">

                  <input type="text" className="form-control" placeholder="Enter name" defaultValue={product.current.name} onChange={(e) => {
                    readValue('name', e.target.value)
                  }} />
                  <input type="number" className="form-control" placeholder="Enter price" defaultValue={product.current.price} onChange={(e) => {
                    readValue('price', Number(e.target.value))
                  }} />
                  <input type="number" className="form-control" placeholder="Enter quantity" defaultValue={product.current.quantity} onChange={(e) => {
                    readValue('quantity', Number(e.target.value))
                  }} />
                  <button className="btn btn-info w-100" onClick={() => {
                    updateProduct();
                  }}>Update Product</button>
                </form>
              </div>
            </div>
          ) : null
      }

      {/* update modal end */}
      <header className="bg-info text-center">
        <h2 className="py-2">Product Management System</h2>
      </header>
      {/* popup message */}
      {/*  */}
      <div className="container w-100">
        <div className="header  bg-light p-3 d-flex justify-content-between align-items-center">
          <h3>All Product</h3>
          <Link to={"/createproduct"}>
            <button className="btn btn-info">Add New Product</button>
          </Link>
        </div>
        <table className="table">
          <thead className="bg-info text-center">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((prodElem, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{prodElem.name}</td>
                  <td>{prodElem.price}</td>
                  <td>{prodElem.quantity}</td>
                  <td>
                    {/* <FaEye className="text-primary icon" /> */}
                    <FaPenAlt
                      className="mx-3 text-success icon"
                      onClick={() => {
                        setupUpdate(prodElem);
                      }}
                    />
                    <FaTrashAlt
                      className="text-danger icon"
                      onClick={() => {
                        if (
                          confirm("Do you really want to delete this product ?")
                        ) {
                          deleteProduct(prodElem._id, index);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* popup message */}

        {

          messagePopup === true ?
            (
              <div className={"message-container " + message.class}>
                <p className="mt-3" style={{ fontSize: "20px" }}>{message.text}</p>
              </div>
            ) : null
           
        }
      </div>
    </>
  );
};

export default ViewProducts;
