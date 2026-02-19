"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

const FALLBACK = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80";

export function ImageWithFallback({ src, alt, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setFailed(false);
  }, [src]);

  return (
    <Image
      {...props}
      alt={alt}
      src={failed ? FALLBACK : imgSrc}
      onError={() => {
        if (!failed) {
          setImgSrc(FALLBACK);
          setFailed(true);
        }
      }}
    />
  );
}
