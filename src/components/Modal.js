import ReactModal from 'react-modal';
import { Component } from 'react';

ReactModal.setAppElement('#root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = event => {
    if (event.target.className === 'Overlay') {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, onClose, item } = this.props;

    return (
      <ReactModal
        className="Modal"
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Modal"
      >
        (
        <div className="Overlay" onClick={this.handleClick}>
          <img src={item.largeImageURL} alt="largeImage" />
        </div>
        )
      </ReactModal>
    );
  }
}
