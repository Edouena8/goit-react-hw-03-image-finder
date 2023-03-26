import React, { Component } from "react";
import PropTypes from "prop-types";
import { ImgGalleryItem, Image } from "./ImageGalleryItem.styled";
import Modal from "components/Modal";

class ImageGalleryItem extends Component {

    static defaultProps = {
        image: PropTypes.shape({
          webformatURL: PropTypes.string.isRequired,
          largeImageURL: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
        }).isRequired,
      };

    state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal,
        }))
    }

    render() {
        const {showModal} = this.state;
        const {id, webformatURL, largeImageURL} = this.props.image;

        return (
            <>                     
                    <ImgGalleryItem key={id} >
                        <Image src={webformatURL} alt="" onClick={this.toggleModal}/>
                    </ImgGalleryItem>  
                    {showModal && (
                        <Modal 
                            largeImageURL={largeImageURL} 
                            onClose={this.toggleModal}
                        />
                    )}    
            </>
        );
    }
    
};

export default ImageGalleryItem;