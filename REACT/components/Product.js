import styles from "../styles/product.module.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";
import {useState} from 'react'
import AddToCart from './AddToCart'

const Product = ({ name, id, price, image }) => {
  
  
  return (
    <Link  href="/products/[id]" as={`/products/${id}`}>
      <div   className={`col-12 col-md-3 ${styles.product}`}>
        <div style={{cursor:"pointer"}}>
        <div className={styles.container}>
          <img
            src={process.env.IMAGE_ENDPOINT + image}
            alt="Avatar"
            className={styles.image}
          />
          <div className={styles.middle}>
            <AddToCart name={name} id={id} price={price} image={image} size={40}>
            <div className="btn btn-outline-primary btn-lg">
              Add To Cart!
            </div>
            </AddToCart>
          </div>
        </div>

        <div>

          {name}
          <br />
          ${price}
        </div>
        </div>
      </div>
      
    </Link>
  );
};

export default Product;
