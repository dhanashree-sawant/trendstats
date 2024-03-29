"use client";
import Image from "next/image";

import React from "react";
import Link from "next/link";
import Logo from "./logo"; 
import { useEffect, useState, useRef } from "react";
import Router from "next/router";
// import { useFocusEffect } from '@react-navigation/native';

const Navbar = ({ toggle }) => {
  const [loggedin,setLoggedin] = useState('Sign In'); 
  
  useEffect(()=>{
    checklogin();
  },[])
  async function checklogin(){
    const response1 = await fetch(process.env.NEXT_PUBLIC_URL+'/api/loginCheck', {
        method: 'GET',
        cache: 'no-store'
      })
      console.log(response1)
      if(response1.status==200){
        console.log('Testing2')
        setLoggedin('Sign Out');
        return true;
      }
      else{
        setLoggedin('Sign In');
        return false;
      }
  }
  

  async function signout(){
    console.log('test')
    const response = await fetch(process.env.NEXT_PUBLIC_URL+'/api/signout', {
      method: 'GET',
    })
    if(response.ok){
      setLoggedin(false);
      Router.replace('/');
    }
  }

    return (
      <>
        <div onFocus={checklogin} className="w-full h-20 bg-white-800 sticky top-0">
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
              
              {!loggedin && <Link href="/"><button className="h-12 rounded-lg bg-white font-bold px-5 sign-in-btn" >{loggedin}</button></Link>}
              <Link href={{
                pathname: '/',
                query: {action: 'signout'}
              }}><button className="h-12 rounded-lg bg-white font-bold px-5 sign-in-btn">{loggedin}</button></Link>
 
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Navbar;