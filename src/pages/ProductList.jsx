import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useNavigate } from "react-router-dom";

import { Footer, Navbar } from "../components";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterProduct = (cat) => {
    const updatedList = products.filter((item) => item.category === cat);
    setFilter(updatedList);
  }
  const addProduct = (product) => {
    dispatch(addCart(product));
    navigate("/cart");
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setLoading2(true);

      try {
        const response = await fetch(
          "http://localhost:9998/BackendCRM/Product/getall"
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching product data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }

      setLoading(false);

      // Fetch similar products
      const response2 = await fetch(
        "https://fakestoreapi.com/products/category/electronics"
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
      
        <div className="container my-5 py-2">
          <div className="row">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="col-md-6 py-3">
                <div className="card">
                  <Skeleton height={400} width={400} />
                  <div className="card-body">
                    <Skeleton height={30} width={250} />
                    <Skeleton height={90} />
                    <Skeleton height={40} width={70} />
                    <Skeleton height={50} width={110} />
                    <Skeleton height={120} />
                    <Skeleton height={40} width={110} inline={true} />
                    <Skeleton className="mx-3" height={40} width={110} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const ProductListItem = ({ product }) => {
    return (
      
      <div className="col-md-6 py-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="lead">${product.price}</p>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to={`/product/${product.id}`} className="btn btn-dark mx-3">
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ProductListContent = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          {filter.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="mx-4">
                <Skeleton height={400} width={250} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => (
              <div key={item.id} className="card mx-4 text-center">

                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                </div>
                <div className="card-body">
                  <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(products)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("HOME")}>HOME</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Accessories")}>
          Accessories
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("electronic")}>electronic</button>
        </div>
      <div className="container">
        <h1 className="my-5 py-3">Product List</h1>
        {loading ? <Loading /> : <ProductListContent />}
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
