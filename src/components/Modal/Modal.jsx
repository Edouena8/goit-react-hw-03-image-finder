import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Overlay, ModalContent } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleEscape);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleEscape);
    }

    handleEscape = evt => {
      const { onClose } = this.props;
      
        if(evt.code === 'Escape') {
            onClose();
        }
    }

    handleBackdropClick = evt => {
      const { onClose } = this.props;
      
        if(evt.currentTarget === evt.target){
           onClose();
        }
    }

    render() {
        const {largeImageURL} = this.props;

        return createPortal(
        <Overlay onClick={this.handleBackdropClick}>
            <ModalContent>
                <img src={largeImageURL} alt="" />
            </ModalContent>
        </Overlay>, modalRoot);
    };
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default Modal;
