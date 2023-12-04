import React from "react";
import Image from "next/image";

interface ImageProps {
  url: string;
}

const ShowImage: React.FC<ImageProps> = ({ url }) => {
  return (
    <div>
      <Image
        className="object-cover w-full h-[400px] rounded-md"
        src={url}
        width={512}
        height={256}
        alt={'unsplash'}
      />
    </div>
  );
};

export default ShowImage;
