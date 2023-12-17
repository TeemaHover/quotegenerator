import React from "react";
import Image from "next/image";
import logo from "../images/feeling.png";

const Navbar: React.FC = () => {

    return (
        <nav className="bg-transparent">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 flex flex-col-reverse">

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Image
                        src={logo}
                        width={192}
                        height={192}
                        alt="Logo"
                    />

                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent">
                        <li>
                            <a href="#" className="block py-2 px-3 text-white dark:text-gray-800 rounded md:bg-transparent md:dark:text-gray-800 md:p-0 md:dark:dark:text-gray-800" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                        </li>
                        {/* <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
