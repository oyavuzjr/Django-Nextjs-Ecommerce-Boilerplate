import React from "react";
import Product from "../../components/Product";
import Carousel from "../../components/Carousel";

import { useStoreState, useStoreActions } from "easy-peasy";

const Products = ({products}) => {

  return (
    <>
      <h1>Products</h1>
      <hr />
      <p>Browse our Products!</p>


      
      <div className="row">
      {products.map((product) => (
        <Product
          name={product.name}
          id={product.id}
          price={product.price}
          image={product.images.length>0?product.images[0].image:""}
        />
      ))}

      {/* {products.map((product) => (
        <Carousel
          name={product.name}
          id={product.id}
          price={product.price}
          image={product.image}
        />
      ))} */}

      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_ENDPOINT}product-list`)
  const products = await res.json();
  console.log(products)
  return {
    props: {products}, // will be passed to the page component as props
  }
}

export default Products;
