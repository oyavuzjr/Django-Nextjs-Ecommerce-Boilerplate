import React, {useState,useEffect,useCallback} from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import AddToCart from '../../components/AddToCart'
import Carousel from '../../components/Carousel'
import ImageViewer from "../../components/ImageViewer";

const Product = ({ product }) => {


  
  const [isViewerOpen, setIsViewerOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    setIsViewerOpen(false);
    setCurrentImage(0);
  },[])
  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const open = ()=>{
    openImageViewer();
  }

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
    <div className="row">
      <div style={{cursor:"pointer"}} className="col text-center">
        <Carousel  images={product.images} open={open} />
      </div>
      <div className="col">
        <h1>{product.name}</h1>
        <h2>${product.price}</h2>
        <hr/>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </p>
        <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        </p>
        <AddToCart id={product.id} image={product.images[0].image} price={product.price} name={product.name} size={40}>
        <div type="button" class="btn btn-primary btn-lg btn-block">Add To Cart!</div>
        </AddToCart>
      </div>
    </div>
    <br/>
    {isViewerOpen && (
        <ImageViewer
          src={product.images.map(image=>image.image)}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `${process.env.API_ENDPOINT}product-detail/${context.params.id}`
  );
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}product-list`);
  const products = await res.json();
  const ids = products.map((product) => product.id.toString());
  const paths = ids.map((i) => ({ params: { id: i } }));

  return {
    paths,
    fallback: false,
  };
};

export default Product;
