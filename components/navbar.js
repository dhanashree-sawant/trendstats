"use client" 
import Image from "next/image";

import React from "react";
import Link from "next/link";
import Logo from "./logo";



const Navbar = ({ toggle }) => {

    return (
      <>
        <div className="w-full h-20 bg-white-800 sticky top-0">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <Logo />
              {/* <ul className="hidden md:flex gap-x-6 text-black custom-text-color">
                <li>
                  <Link href="/about">
                    <p>About Us</p>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <p>Services</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contacts">
                    <p>Contacts</p>
                  </Link>
                </li>
              </ul> */}
              <Link href="/">
              <button className="h-12 rounded-lg bg-white font-bold px-5 sign-in-btn" >Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navbar;