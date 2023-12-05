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

  render() {
    const { isOpen, onClose, item } = this.props;

    return (
      <div className="Overlay" onClick={onClose}>
        <ReactModal
          className="Modal"
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Modal"
        >
          <img src={item.largeImageURL} alt="largeImage" />
        </ReactModal>
      </div>
    );
  }
}
