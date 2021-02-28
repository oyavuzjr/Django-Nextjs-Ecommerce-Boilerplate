import React, {useState,useEffect,useCallback} from "react";
import styles from "../styles/product.module.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";
import AddToCart from './AddToCart'
import ImageViewer from "./ImageViewer";

const Carousel = ({images,open}) => {


  return (<div style={{width:"400px",height:"auto",marginLeft:"auto",marginRight:"auto"}} id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    {images.map((image,index)=><li data-target="#carouselExampleIndicators" data-slide-to={index.toString()} class={index===0?'active':''}></li>)}

  </ol>
  <div  class="carousel-inner">
    {images.map(image=><div onClick={open} class={`carousel-item ${images[0]==image?"active":""}`}>
      <img  class="d-block w-100" src={image.image} alt="First slide" style={{width:"50%"}}/>
    </div>)}
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>);
};

export default Carousel;
