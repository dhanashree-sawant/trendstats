import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";



const Logo = () => {
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  // change between the logo and the button when the user scrolls
  const [showButton, setShowButton] = useState(false);

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavButton);
  }, []);

  return (
    <>
      <Link href="/" style={{ display: showButton ? "none" : "block" , height:'90%'}}>
        <Image
          src="/images/logo-improved.png"
          alt="Logo"
          width={width < 1024 ? "150" : "250"}
          height={width < 1024 ? "45" : "74"}
          className="relative"
          style={{maxHeight: '80px',maxWidth: '200px'}}
        />
      </Link>
      <div
        style={{
          display: showButton ? "block" : "none",
        }}
      >
        <button className="h-12 rounded-lg bg-white font-bold px-5 sign-in-btn" >Sign In</button>
      </div>
    </>
  );
};

export default Logo;