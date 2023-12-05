// import { fetchImages } from './api';
import { Component } from 'react';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    images: [],
    page: 1,
  };

  render() {
    return (
      <div className="App">
        <Searchbar />
      </div>
    );
  }
}
