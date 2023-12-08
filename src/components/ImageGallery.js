import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ items }) => {
  return (
    <ul className="ImageGallery">
      {items.map((item, index) => (
        <ImageGalleryItem key={`${item.id}-${index}`} item={item} />
      ))}
    </ul>
  );
};
