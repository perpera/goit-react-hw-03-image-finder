import { fetchImages } from './api';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
  };

  componentDidUpdate(prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImageData();
    }
  }

  fetchImageData = async () => {
    const { query, page } = this.state;

    try {
      const imageData = await fetchImages(query, page);

      if (page === 1) {
        this.setState({ images: imageData });
      } else if (imageData.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...imageData],
        }));
      } else {
        toast.error('There are no more images');
      }
    } catch (error) {
      toast.error('Falied to fetch images. Please try again.');
    }
  };

  handleSubmit = newQuery => {
    this.setState({
      query: newQuery,
      page: 1,
    });
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery items={images} />
        <Toaster />
      </div>
    );
  }
}
