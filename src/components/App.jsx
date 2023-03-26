import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from "services/images-api";
import { AppWrap } from "./App.styled";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";

class App extends Component {

  state = {
    imageName: '',
    page: 1,
    images: [],
    loading: false,
    totalHits: 0,
    showBtn: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const {images} = this.state;

    if(prevName !== nextName || prevPage !== nextPage) {

      this.setState({ loading: true });

      fetchImages(nextName, nextPage)
      .then(({hits, totalHits}) => {
        
        if(!hits.length) {
          toast.error(`${nextName} not found`);
          return;
        }
          this.setState({
             images: [...images, ...hits],
             showBtn: nextPage < Math.ceil(totalHits / 12),
             loading: false
          })
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  }

  handleLoadMoreBtnClick = () => {
    this.setState(({page}) => ({
        page: page + 1,
    }))
  }

  render() {
    const {images, loading, showBtn} = this.state;
    
    return (
      <AppWrap>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {loading &&  <Loader/>}
        {/* {error && <h2>{error.message}</h2>} */}
        {images.length > 0 && <ImageGallery images={images}/>}
        {showBtn && <Button onClick={this.handleLoadMoreBtnClick}/>} 
        <ToastContainer autoClose={3000} theme="dark"/>
      </AppWrap>
    )
  }
}

export default App;
