import { useState } from "react";

export default function ImageZoom({
  src,
  alt,
  zoom = 2.5,
}) {
  const [style, setStyle] = useState({
    opacity: 0,
    backgroundImage: `url(${src})`,
    backgroundPosition: "50% 50%",
    backgroundSize: `${zoom * 100}%`,
  });

  const handleMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setStyle({
      opacity: 1,
      backgroundImage: `url(${src})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: `${zoom * 100}%`,
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
      className="relative aspect-square overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover select-none"
        draggable={false}
      />

      <div
        className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
        style={style}
      />
    </div>
  );
}