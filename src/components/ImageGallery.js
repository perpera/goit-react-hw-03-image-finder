import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ items }) => {
  return (
    <ul className="ImageGallery">
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
