import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Gallery() {
  const handleDragStart = (e) => e.preventDefault();
  const items = [
    
    // eslint-disable-next-line react/jsx-key
    <img
      src="../../assets/images/image-driver.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    // eslint-disable-next-line react/jsx-key
    <img
      src="../../assets/images/driver2.png"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    // eslint-disable-next-line react/jsx-key
    <video
      src="../../assets/videos/video.mp4"
      onDragStart={handleDragStart}
      role="presentation"
      controls="controls"
      autoPlay={true}
    />,
  ];

  return (
    <div className={`flex-start`}>
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        autoPlayInterval={2000}
        infinite
        disableButtonsControls={false}
      />
    </div>
  );
}

export default Gallery;
