import React from "react";

interface QuoteProps {
  text: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author }) => {
  return (
    <div className="quote w-[518px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10 text-center">
      <p className="font-bold">{text}</p>
      <p className="mt-4">{author}</p>
    </div>
  );
};

export default Quote;
