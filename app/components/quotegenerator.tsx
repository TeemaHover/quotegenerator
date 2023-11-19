"use client";
import React, { useState, useEffect, Suspense } from "react";
import Quote from "./quote";
import axios from "axios";
import Image from "next/image";
import { METHODS } from "http";
import { Content } from "next/font/google";
import LinearProgress from "@mui/material/LinearProgress";
import Loading from "./loading";
import ShowImage from "./image";

const QuoteGenerator: React.FC = () => {
  const url = "https://api.quotable.io/random";
  const accessKey = "IY551ZQ33t1tc4sxI16PTTefWVZEBIbIapWCOkmMmi0";

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

  let stored_id = [""]

  async function postData(url = "") {
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      let index = Math.floor(Math.random() * data.results.length);

      let check = stored_id.includes(data.results[index].id);

      console.log(check)

      while (check) {
        console.log(check)
        index = Math.floor(Math.random() * data.results.length);
        check = stored_id.includes(data.results[index].id);
      }
      console.log(stored_id)
      setImages(data.results[index].urls.raw);
      stored_id.push(data.results[index].id);
      console.log(data.results[index].id);
    } else {
      console.error("Error fetching images");
    }
    setIsLoading(false);
  }

  return (
    <div className="quote-generator flex justify-center items-center flex-col">
      <button
        onClick={function (event) {
          setQuote(emptyQuote);
          setImages("");
          getNewQuote();
          postData(
            `https://api.unsplash.com/search/photos?query=${quote.tags[0]}&client_id=${accessKey}`
          );
        }}
        className="text-blue-200 border-solid border-2 border-white rounded-md p-3 mb-5"
      >
        Get New Quote
      </button>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Quote text={quote.content} author={quote.author} />
          <ShowImage url={images} />
        </>
      )}
    </div>
  );
};

export default QuoteGenerator;
