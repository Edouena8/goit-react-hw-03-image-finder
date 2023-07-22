import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from "services/images-api";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";

class App extends Component {

  state = {
    imageName: '',
    images: [],
    page: 1,
    totalHits: 0,
    perPage: 12,
    loading: false,
    showBtn: false,
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { perPage } = this.state;

    if(prevName !== nextName || prevPage !== nextPage) {

      this.setState({ loading: true });

      fetchImages(nextName, nextPage, perPage)
      .then(({hits, totalHits}) => {
        
        if(!hits.length) {
          toast.error(`${nextName} not found. Please try again!`);
          return;
        }

        if (nextPage === Math.round(this.state.totalHits / perPage)) {
            this.setState({showBtn: false})
          }
        
          this.setState(({ images }) => ({
            images: [...images, ...hits],
            totalHits,
            showBtn: true,
          }));
      })
      .catch(error => this.setState({ error, showBtn: false }))
      .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ 
      imageName,
      images: [],
      page: 1,
      totalHits: 0,
      perPage: 12,
      loading: false,
      showBtn: false,
      error: null,
    });
  }

   handleLoadMoreBtn = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      showBtn: false,
      loading: true,
    }));
  };

  render() {
    const {images, loading, showBtn, error} = this.state;
    
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {error && <p>{error.message}</p>}
        {showBtn && <Button onLoadMoreButton={this.handleLoadMoreBtn} />}
        {loading && <Loader />}
        <ToastContainer autoClose={3000} theme="dark"/>
      </div>
    )
  }
}

export default App;
