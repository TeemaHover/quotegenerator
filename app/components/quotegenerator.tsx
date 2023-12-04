"use client";
import React, { useState, useEffect, Suspense } from "react";
import Quote from "./quote";
import axios from "axios";

import { METHODS } from "http";
import { Content } from "next/font/google";
import LinearProgress from "@mui/material/LinearProgress";
import Loading from "./loading";
import ShowImage from "./image";

const QuoteGenerator: React.FC = () => {
  const url = "https://api.quotable.io/random";

  const [quote, setQuote] = useState<{
    content: string;
    author: string;
    tags: string;
  }>({
    content: "",
    author: "",
    tags: "",
  });

  const emptyQuote = { content: "", author: "", tags: "" };
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState("");

  const getNewQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setQuote(data);
        console.log(data.tags);
      } else {
        console.error("Failed to fetch a new quote. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching a new quote:", error);
    } finally {
    }
  };

  let stored_id = "https://images.unsplash.com/photo-1557724630-96de91632c3b?ixid=M3w1MTYxNTl8MHwxfHNlYXJjaHwxfHx1bmRlZmluZWR8ZW58MHx8fHwxNzAxMDU1NDE4fDA&ixlib=rb-4.0.3";

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/unsplash`, {
        params: {
          query: quote.tags[0],
        },
      });

      if (response.status === 200) {
        
        setImages(response.data[1].urls.raw);
        console.log(response.data[1].urls.raw);
        setIsLoading(false);
      } else {
        console.error("Error fetching images");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [combinedImage, setCombinedImage] = useState<string | null>(null);

  const combineImageAndQuote = async () => {
    try {
      if (!images) {
        console.error("Image source is not provided.");
        return;
      }

      const image = new Image();
      image.src = images
      image.crossOrigin = "anonymous"

      await image.decode();

      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Unable to get 2D context from canvas.");
        return;
      }

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.font = "11px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(quote.content, canvas.width / 2, canvas.height / 2);
      console.log(canvas)
      const combinedImageUrl = canvas.toDataURL("image/png");
      console.log("check this:",combinedImage)
      setCombinedImage(combinedImageUrl);
      
    } catch (error) {
      console.error("Error combining image and quote:", error);
    }
  };

  const handleDownload = () => {
    if (combinedImage) {
      const downloadLink = document.createElement("a");
      downloadLink.href = combinedImage;
      downloadLink.download = "quote_image.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const clearQuoteAndImages = () => {
    setQuote(emptyQuote);
    setImages("");
  };
  return (
    <div className="relative quote-generator flex justify-center items-center flex-col ">
      <button
        onClick={async function () {
          // Clear existing quote and images
          clearQuoteAndImages();

          // Get a new quote (assuming it's asynchronous)
          await getNewQuote();

          // Handle the search based on the new quote
          await handleSearch();
        }}
        className="text-blue-300 border-solid border-2 border-blue-300 rounded-md p-3 mb-5"
      >
        Get New Quote
      </button>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="relative w-[768px] shadow-2xl rounded-md">
            <Quote text={quote.content} author={quote.author} />
            <ShowImage url={images} />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 rounded-md"></div>
            <div className=" absolute top-10 -right-16 p-5 bg-blue-300 text-white rounded-sm">
              
              <p>{quote.tags[0]}</p>
            </div>
            
          </div>
          <button
            onClick={async function () {
              // Get a new quote (assuming it's asynchronous)
              await combineImageAndQuote();

              // Handle the search based on the new quote
              await handleDownload();
            }}
            className="text-blue-300 border-solid border-2 border-blue-300 rounded-md p-3 mb-5"
          >
            Download
          </button>
          
        </>
      )}
    </div>
  );
};

export default QuoteGenerator;
