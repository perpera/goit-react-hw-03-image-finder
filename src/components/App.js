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

  fetchImageData = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await fetchImages(query, page);
      if (hits.length === 0) {
        return toast.error('No images found.');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / 12),
      }));
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
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loadMore, images, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery items={images} />}

        {loadMore && !isLoading && images.length > 0 && (
          <Button onClick={this.loadMore} />
        )}
        {isLoading && <Loader />}
        <Toaster />
      </div>
    );
  }
}
