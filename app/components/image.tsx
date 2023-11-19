import React from "react";
import Image from "next/image";

interface ImageProps {
  url: string;
}

const ShowImage: React.FC<ImageProps> = ({ url }) => {
  return (
    <div>
      <Image
        className="image-result"
        src={url}
        width={512}
        height={512}
        alt="ai generated"
      />
    </div>
  );
};

export default ShowImage;
