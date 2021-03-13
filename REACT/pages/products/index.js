import React,{useEffect} from "react";
import Product from "../../components/Product";

const Products = ({products}) => {
  return (
    <>
      <h1>Products</h1>
      <hr />
      <p>Browse our Products!</p>   
      <div className="row">
      {products.map((product,idx) => (
        <Product
          key={idx}
          name={product.name}
          id={product.id}
          price={product.price}
          image={product.images.length>0?product.images[0].image:""}
        />
      ))}

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
