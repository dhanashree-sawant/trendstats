import { redirect } from "next/dist/server/api-utils";
import Link from "next/link"
import { useState,FormEvent } from 'react'
import Router from "next/router";

export default function signup(){

    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
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
        <div className="container login-container-custom">
      <h2>Sign up</h2>
  <form onSubmit={onSubmit}>
  <div className="row form-group">
        <div className="col">
        <input type="text" className="form-control" required name="first_name" placeholder="First name"/>
        </div>
        <div className="col">
        <input type="text" className="form-control" name="last_name" placeholder="Last name (optional)"/>
    </div>
    </div>
    <div className="form-group">
      <input type="email" className="form-control" name="email" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>
    <div className="row form-group">
    <div className="col">
      <input type="password" className="form-control" required name="password" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <div className="col">
      <input type="password" className="form-control" required name="confirm_password" id="exampleInputPassword1" placeholder="Confirm password"/>
    </div>
    </div>
    {error && <div className="text-danger mb-2">{error}</div>}
    {success && <div className="text-success mb-2">{success}</div>}
    <button type="submit" className="btn btn-primary">Submit</button>

  </form>

  
</div>
    )
}