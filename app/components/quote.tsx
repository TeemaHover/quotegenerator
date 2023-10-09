import React from "react";

interface QuoteProps {
  text: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author }) => {
  return (
    <div className="quote">
      <p className="font-bold">{text}</p>
      <p className="mt-4">{author}</p>
    </div>
  );
};

export default Quote;
