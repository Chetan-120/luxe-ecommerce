import { useState } from "react";

const ImageMagnifier = ({
  src,
  alt,
  zoom = 2,
}) => {
  const [style, setStyle] = useState({
    backgroundImage: `url(${src})`,
    backgroundPosition: "50% 50%",
    opacity: 0,
  });

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setStyle({
      backgroundImage: `url(${src})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: `${zoom * 100}%`,
      opacity: 1,
    });
  };

  const handleLeave = () => {
    setStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative aspect-square overflow-hidden rounded-3xl"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={style}
      />
    </div>
  );
};

export default ImageMagnifier;