import React, {useState,useEffect,useCallback} from "react";
import styles from "../styles/product.module.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";
import AddToCart from './AddToCart'
import ImageViewer from "./ImageViewer";

const Carousel = ({images,open}) => {


  return (<div style={{width:"400px",height:"auto",marginLeft:"auto",marginRight:"auto"}} id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    {images.map((image,index)=><li key={index} data-target="#carouselExampleIndicators" data-slide-to={index.toString()} className={index===0?'active':''}></li>)}

  </ol>
  <div  className="carousel-inner">
    {images.map((image,idx)=><div key={idx} onClick={open} className={`carousel-item ${images[0]==image?"active":""}`}>
      <img  className="d-block w-100" src={image.image} alt="First slide" style={{width:"50%"}}/>
    </div>)}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>);
};

export default Carousel;
