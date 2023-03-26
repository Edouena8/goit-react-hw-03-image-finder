import ImageGalleryItem from "components/ImageGalleryItem";
import PropTypes from 'prop-types';
// import Loader from "components/Loader";
import { ImgGallery } from "./ImageGallery.styled";

const ImageGallery = ({images}) => { 
    console.log(images)
        return (      
            <ImgGallery>
                {images.map(image => (
                    <ImageGalleryItem image={image} key={image.id}/>
                ))}                  
            </ImgGallery>           
        );
};

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
}

export default ImageGallery;
