import React from "react";
import { Loader } from "../../../common/loader/loader.component";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const img_Url = process.env.REACT_APP_IMG_URL;
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
const getImages = (images = []) => {
    const mappedImage = images.map((img) => ({
      original: `${img_Url}/${img}`,
      thumbnail: `${img_Url}/${img}`,
    }));
    return mappedImage
}

export const ProductDetails = ({ product,isLoading}) => {
  console.log("product is", product);
  let content = isLoading ? (
    <Loader></Loader>
  ) : (
    <>
      <h2>ProductDetails</h2>
      <div className="row">
        <div className="col-md-4">
          <div>
            <ImageGallery items={getImages(product.image)} />
          </div>
        </div>
        <div className="col-md-8">
          <h3>{product.name} Details</h3>
          <p>{product.description}</p>
                      <>
                          <h2>Reviews</h2>
            {(product.reviews || []).map((item, index) => (
                <div key={item._id}>
                    <h5>review Point</h5>
                    <p>{item.point}</p>
                    <h5>message</h5>
                    <p>{item.message}</p>
                    <h5>User</h5>
                    <p>{item.user.firstName}</p>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );

  return content;
};
