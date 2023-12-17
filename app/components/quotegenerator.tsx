"use client";
import React, { useState, useEffect } from "react";
import Quote from "./quote";
import axios from "axios";

import QRCode from "qrcode.react";
import Loading from "./loading";
import ShowImage from "./image";

const QuoteGenerator: React.FC = () => {
  const url = "https://api.quotable.io/random";

  const [quote, setQuote] = useState<{
    content: string;
    author: string;
    tags: [];
  }>({
    content: "",
    author: "",
    tags: [],
  });


  const [isLoading, setIsLoading] = useState(false);
  const [storedIds, setStoredIds] = useState<string[]>([]);
  const [images, setImages] = useState("");
  const [randomQRCode, setRandomQRCode] = useState<string | null>(null);
  const [qrCodeScanned, setQrCodeScanned] = useState(false);

  const getNewQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setQuote({
          content: data.content,
          author: data.author,
          tags: data.tags,
        });
        console.log(data.tags);
        generateRandomQRCode();
      } else {
        console.error("Failed to fetch a new quote. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching a new quote:", error);
    } finally {
    }
  };



  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/unsplash`, {
        params: {
          query: quote.tags,
        },
      });

      if (response.status === 200) {
        const randomIndex = Math.floor(Math.random() * 10);

        const imageUrl = response.data[randomIndex].urls.raw;


        if (!storedIds.includes(imageUrl)) {

          storedIds.push(imageUrl);
          setImages(imageUrl);
        } else {

          const nextIndex = (randomIndex + 1) % 10;
          const nextImageUrl = response.data[nextIndex].urls.raw;


          storedIds.push(nextImageUrl);
          setImages(nextImageUrl);
        }

        console.log(imageUrl);
        setIsLoading(false);
      } else {
        console.error("Error fetching images");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [combinedImage, setCombinedImage] = useState<string | null>(null);
  const [downloadInitiated, setDownloadInitiated] = useState(false);


  const combineImageAndQuote = async () => {
    try {
      if (!images) {
        console.error("Image source is not provided.");
        return;
      }

      const image = new Image();
      image.src = images;
      image.crossOrigin = "anonymous";

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


      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);


      const textFieldWidth = (3 / 4) * canvas.width;


      ctx.font = "11px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";


      const textX = canvas.width / 2;


      const textY = canvas.height / 2;


      ctx.fillText(quote.content, textX, textY, textFieldWidth);


      const authorY = textY + 20;
      ctx.fillText(`${quote.author}`, textX, authorY, textFieldWidth);

      const combinedImageUrl = canvas.toDataURL("image/png");
      console.log("check this:", combinedImageUrl);
      setCombinedImage(combinedImageUrl);

      try {
        const response = await axios.post('/api/saveQuote', {
          content: quote.content,
          author: quote.author,
          tags: quote.tags,
          image: images,
        });
        if (response.status === 201) {
          console.log("Added to DB")
        } else {
          console.log("There are error")
        }
      } catch (error) {
        console.log("Error: ", error)
      }

      console.log("Combine ended");

      if (!downloadInitiated) {
        setDownloadInitiated(true);
        handleDownload();
      }
    } catch (error) {
      console.error("Error combining image and quote:", error);
    }
  };

  const handleDownload = () => {

    if (combinedImage) {
      console.log("download started");
      const downloadLink = document.createElement("a");
      downloadLink.href = combinedImage;
      downloadLink.download = "quote_image.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  const generateRandomQRCode = () => {

    const randomString = Math.random().toString(36).substring(2, 15);


    setRandomQRCode(randomString);
  };

  const clearQuoteAndImages = () => {
    setQuote({
      content: "",
      author: "",
      tags: [],
    });
    setImages("");
  };
  useEffect(() => {
    if (downloadInitiated) {
      handleDownload();
      setDownloadInitiated(false);
      setQrCodeScanned(false)
    }

  }, [downloadInitiated]);
  return (
    <>

      <div className="relative quote-generator flex justify-center items-center flex-col ">
        <button
          onClick={async function () {

            clearQuoteAndImages();


            await getNewQuote();


            await handleSearch();
          }}
          className="flex-initial bg-black/75 text-white font-semibold px-3 py-4 rounded-full my-4"
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
              {images ? (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 rounded-md"></div>
              ) : <div className="absolute top-0 left-0 w-full h-full bg-white opacity-70 rounded-md"></div>}


              {images ? (<div className=" absolute top-10 -right-16 p-5 bg-zinc-800 text-white rounded-sm">
                <p>{quote.tags}</p>
              </div>) : null}

            </div>
            {quote ? (qrCodeScanned ? (
              <button
                onClick={async function () {

                  await combineImageAndQuote();

                }}
                className="flex-initial bg-black/75 text-white font-semibold px-3 py-4 rounded-full my-4"
              >
                Download
              </button>
            ) : (
              <div className="mt-5 flex justify-center items-center flex-col">
                {randomQRCode !== null && (
                  <>
                    <QRCode value={randomQRCode} />

                    <button className="flex-initial bg-black/75 text-white font-semibold px-6 py-4 rounded-full my-4" onClick={() => setQrCodeScanned(true)}>Check</button>
                  </>
                )}

              </div>
            )) : null}

          </>
        )}
      </div>
    </>
  );
};

export default QuoteGenerator;
