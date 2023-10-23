"use client";
import React, { useState, useEffect } from "react";
import Quote from "./quote";
import axios from "axios";
import Image from "next/image";
import { METHODS } from "http";
import { Content } from "next/font/google";

const QuoteGenerator: React.FC = () => {
  const url = "https://api.quotable.io/random";
  const accessKey = 'IY551ZQ33t1tc4sxI16PTTefWVZEBIbIapWCOkmMmi0';

  const [quote, setQuote] = useState<{
    content: string;
    author: string;
    tags: string;
  }>({
    content: "",
    author: "",
    tags: "",
  });

  const emptyQuote = {content:"",author:"",tags:""}

  const [query, setQuery] = useState('');
  const [images, setImages] = useState('');

  const getNewQuote = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setQuote(data);
        setQuery(data.tags)
        console.log(data.tags)
        
      } else {
        console.error("Failed to fetch a new quote. Status:", response.status);
      }
      
      
        
    } catch (error) {
      console.error("An error occurred while fetching a new quote:", error);
    }
    
  };

  

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/unsplash?query=${quote.tags}`,{
        method:"GET"
      });
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error('Error fetching images');
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  async function postData(url = "") {
    console.log(url)
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    let index = Math.floor(Math.random() * 10)
    console.log(index)

    if (response.ok) {
      const data = await response.json();
      setImages(data.results[index].urls.raw);
      console.log(data.results[index].urls.raw)
    } else {
      console.error('Error fetching images');
    }
  }
  


  
  return (
    <div className="quote-generator flex justify-center items-center flex-col">
      <button
        onClick={function (event) {
          setQuote(emptyQuote)
          setImages("")
          getNewQuote();
          // handleSearch();
          postData(`https://api.unsplash.com/search/photos?query=${quote.tags[0]}&client_id=${accessKey}`)
        }}
        className="text-blue-200 border-solid border-2 border-white rounded-md p-3 mb-5"
      >
        Get New Quote
      </button>
      <div>
        <Quote text={quote.content} author={quote.author} />
      </div>
      {images && (
        <>
          <Image  className="image-result" src={images} width={512} height={512} alt="ai generated" />
          
        </>
      )}
      <div></div>
    </div>
  );
};

export default QuoteGenerator;
