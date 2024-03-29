import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useSearchParams } from 'next/navigation'
import Navigation from "./navigation/navigation";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const searchParams = useSearchParams()
  let action = searchParams.get('action') ?? 'default';
  
  checklogin()


  async function checklogin(){
    console.log(action)
    if(action=='signout'){
      const response2 = await fetch(process.env.NEXT_PUBLIC_URL+'/api/signout', {
        method: 'GET',
        cache: 'no-store'
      })
      console.log(response2)
      if(!response2.ok){
        Router.replace('/dashboard')
      }
    }
    else{
      console.log(process.env.NEXT_PUBLIC_URL+'/api/loginCheck')
      const response1 = await fetch(process.env.NEXT_PUBLIC_URL+'/api/loginCheck', {
          method: 'GET',
          cache: 'no-store'
        })
        //console.log(response1)
        if(response1.ok){
          Router.replace('/dashboard')
        }
    } 
  }

  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')

  async function onSubmit(event) {
    let error_text = '';
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const response = await fetch('/api/login', {
        method: 'POST',
        body: [formData.get('email'),formData.get('password')],
      })

      if(response.ok){
        setError('');
        setSuccess('Login successfully!')
        Router.replace('/dashboard')
      }
      else{
        setError('Email or password is incorrect')
      }
    
  }

  return (
    <div className="Navigation">
      <Navigation/>
    <div className="container login-container-custom rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <h2 className="text-title-md2 font-semibold text-black dark:text-white">Log in to your account</h2>
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <input type="email" name="email" required className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>
    <div className="form-group">
      <input type="password" name="password" required className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    {error && <div className="text-danger mb-2">{error}</div>}
    {success && <div className="text-success mb-2">{success}</div>}
    <button type="submit" name="submit" className="h-12 rounded-lg bg-white font-bold px-5 sign-in-btn">Submit</button>

  </form>

  <div className="suggest-signup-component">
    <span className="suggest-signup-prefix">Don't have an account yet? </span>
    <Link href='/sign-up'>
    <button type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >Sign up</button>
    </Link>
  </div>
</div>
</div>
  );
}
