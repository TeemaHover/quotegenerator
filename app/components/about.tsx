import React from "react";
import Image from "next/image";


const About: React.FC = () => {
    return (
        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="image false my-auto">
                <Image
                    src={"https://images.unsplash.com/photo-1497704628914-8772bb97f450?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDcxMTcwfHxlbnwwfHx8fHw%3D"}
                    width={512}
                    height={512}
                    alt="about image"
                />
            </div>
            <div className="flex flex-col gap-y-4 mx-auto my-auto">
                <h2 className="text-black font-extrabold text-5xl mb-2 text-left">
                    The Future of Quote Generator
                </h2>
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-x-4 max-w-2xl">
                        <div className="flex rounded-xl">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="circle"
                                className="svg-inline--fa fa-circle text-xs w-2 mt-2 text-gray-700 mx-auto mt-1"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-700 font-bold mb-1">
                                Embracing Quotes
                            </h3>
                            <p className="text-lg mb-4 text-gray-600">
                                The realm of quote generator marks a transformative
                                shift. Our Random Quote Generator can intuitively produce quotes
                                that resonate with contemporary themes and ideas, making it an
                                invaluable tool for modern communicators.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-x-4 max-w-2xl">
                        <div className="flex rounded-xl">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="circle"
                                className="svg-inline--fa fa-circle text-xs w-2 mt-2 text-gray-700 mx-auto mt-1"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-700 font-bold mb-1">
                                Impact on Literary Creativity
                            </h3>
                            <p className="text-lg mb-4 text-gray-600">
                                The role in literary creativity is increasingly significant. Our
                                Random Quote Generator not only offers a new avenue for generating
                                quotes but also inspires users to think differently about
                                language and expression, enriching the literary landscape with
                                fresh perspectives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
