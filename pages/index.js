import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from "next/router";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
    <div className="container login-container-custom">
      <h2>Log in to your account</h2>
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <input type="email" name="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>
    <div className="form-group">
      <input type="password" name="password" required className="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    {error && <div className="text-danger mb-2">{error}</div>}
    {success && <div className="text-success mb-2">{success}</div>}
    <button type="submit" name="submit" className="btn btn-primary">Submit</button>

  </form>

  <div className="suggest-signup-component">
    <span className="suggest-signup-prefix">Don't have an account yet? </span>
    <Link href='/sign-up'>
    <button type="button" className="page-link-component" >Sign up</button>
    </Link>
  </div>
</div>
  );
}
