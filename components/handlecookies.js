import { cookies } from "next/headers";

export function loginCheck(){
    const cookieStore = cookies();
    if(cookieStore.get('login')!=undefined){
        return true;
    }
    else{
        return false;
    }
}

export function signout(){
    cookieStore.delete('login')
    return true;
}

export function login(){
    cookieStore.set('login','true',{secure:true})
    return true;
}