"use client";
import React, { useState, useEffect } from "react";
import Quote from "./quote";
import axios from "axios";
import Image from "next/image";

const QuoteGenerator: React.FC = () => {
  const url = "https://api.quotable.io/random";
  // const url = 'https://quotes-api8.p.rapidapi.com/quotes/random';
  // const options = {
  //     method: 'GET',
  //     headers: {
  //         'X-RapidAPI-Key': '474b5ca236mshe2492f368536e07p1721c0jsn63aba7dc079a',
  //         'X-RapidAPI-Host': 'quotes-api8.p.rapidapi.com'
  //     }
  // };

  // const sendMessage = (message) =>{
  //     const url =
  // }

  // const callAPI = async () => {
  //     try {
  //         const res = await fetch(
  //             url, options
  //         );
  //         const data = await res.json();
  //         console.log(data);
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  const [quote, setQuote] = useState<{
    content: string;
    author: string;
    tags: string;
  }>({
    content: "",
    author: "",
    tags: "",
  });

  // useEffect(() => {
  //     fetch(url, options)
  //         .then((response) => response.json())
  //         .then((data) => {
  //             setQuote(data);
  //         });
  // }, []);

  const getNewQuote = () => {
    // fetch(url, options)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setQuote(data);
    //     });
    // console.log(quote.quote)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuote(data);
      });
  };

  const [image, setImage] = useState("");
  async function generateImage(): Promise<any> {
    const response = await fetch(`api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${quote.tags}`,
      }),
    });
    console.log(response);
    const data = await response.json();

    console.log(data);

    setImage(data.url);
  }

  return (
    <div className="quote-generator flex justify-center items-center flex-col">
      <button
        onClick={function (event) {
          getNewQuote();
          generateImage();
        }}
        className="text-blue-200 border-solid border-2 border-white rounded-md p-3 mb-5"
      >
        Get New Quote
      </button>
      <div>
        <Quote text={quote.content} author={quote.author} />
      </div>
      {image && (
        <>
          <Image className="image-result" src={image} alt="ai generated" />
        </>
      )}
      <div></div>
    </div>
  );
};

export default QuoteGenerator;
