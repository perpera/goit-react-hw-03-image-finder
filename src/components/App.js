import { fetchImages } from './api';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader';
import { Button } from './Button';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImageData();
    }
  }

  fetchImageData = async page => {
    const { query } = this.state;

    try {
      this.setState({ isLoading: true });
      const imageData = await fetchImages(query, page);

      if (page === 1) {
        this.setState({ images: imageData, totalHits: imageData.length });
      } else if (imageData.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...imageData],
          loadMore: imageData.length < 12,
        }));
      } else {
        toast.error('There are no more images');
        this.setState({ loadMore: true });
      }
    } catch (error) {
      toast.error('Failed to fetch images. Please try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('Can not be empty');
      return;
    }

    this.setState({
      query: newQuery,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    const { loadMore } = this.state;

    if (!loadMore) {
      this.setState(
        prevState => ({
          page: prevState.page + 1,
        }),
        () => {
          this.fetchImageData(this.state.page);
        }
      );
    } else {
      toast.error('There are no more images');
    }
  };

  render() {
    const { loadMore, images, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery items={images} />
        {images.length > 0 && !isLoading && !loadMore && (
          <Button onClick={this.loadMore} disabled={!this.state.loadMore} />
        )}
        {isLoading && <Loader />}
        <Toaster />
      </div>
    );
  }
}
