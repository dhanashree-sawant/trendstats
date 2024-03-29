import { redirect } from "next/dist/server/api-utils";
import Link from "next/link"
import { useState,FormEvent } from 'react'
import Router from "next/router";
import { useEffect } from "react";
import Navigation from "./navigation/navigation";

export default function signup(){

    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    useEffect(()=>{
      checklogin()
    },[])
  
    async function checklogin(){
      const response = await fetch('/api/loginCheck', {
          method: 'GET',
          cache: 'no-store'
        })
        if(response.ok){
          Router.replace('/dashboard')
        }
    } 
    async function onSubmit(event) {
        
        let error_text = '';
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if(formData.get('password')!=formData.get('confirm_password')){
            error_text = 'Kindly enter same password in confirm password field'
            setError('Kindly enter same password in confirm password field')
        }
        else{
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: formData.get('email'),
              })

              if(response.ok){
                const response2 = await fetch('/api/insertuser', {
                    method: 'POST',
                    body: [formData.get('first_name'),formData.get('last_name'),formData.get('email'),formData.get('password')],
                  })
                if(response2.ok){
                    setError('')
                    setSuccess('Registration completed successfully!')
                    Router.replace('/dashboard')
                }
              }
              else{
                setError('Email already exists, kindly use different email')
              }
        }
      }

    return(
      <div className="Navigation">
      <Navigation/>
        <div className="container login-container-custom rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">Sign up</h2>
  <form onSubmit={onSubmit}>
  <div className="row form-group">
        <div className="col">
        <input type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required name="first_name" placeholder="First name"/>
        </div>
        <div className="col">
        <input type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" name="last_name" placeholder="Last name (optional)"/>
    </div>
    </div>
    <div className="form-group">
      <input type="email" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" name="email" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>
    <div className="row form-group">
    <div className="col">
      <input type="password" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required name="password" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <div className="col">
      <input type="password" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required name="confirm_password" id="exampleInputPassword1" placeholder="Confirm password"/>
    </div>
    </div>
    {error && <div className="text-danger mb-2">{error}</div>}
    {success && <div className="text-success mb-2">{success}</div>}
    <button type="submit" className="h-12 rounded-lg bg-white font-bold px-5 sign-in-btn">Submit</button>

  </form>

  
</div>
</div>
    )
}