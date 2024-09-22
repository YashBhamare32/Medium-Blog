import React, { useState } from "react";
import { Link } from "react-router-dom"
import { LabelledInput } from "./Labelledinput";
import { UserTypes } from "../../types/UserTypes";


export const Auth =({type}: {type:"signup"|'signin'})=>{
    const [postInputs, setPostInputs] = useState<UserTypes>({
        name:"",
        username:"",
        password:""
    })
    return(
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 mb-4">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-slate-600">
                            {type === "signin" ? "Don't have an account" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type=== "signin" ? "Sign up":"Sign in"}</Link>
                        </div>
                    </div>
                    {type === "signup" && <LabelledInput name="Name" placeholder="Enter your full name" onchange={(e)=>{
                        setPostInputs(c =>({
                            ...postInputs,
                            name: e.target.value
                        }));
                    }}/>}
                    <LabelledInput name="Username" placeholder="Enter your username" onchange={(e)=>{
                        setPostInputs(c =>({
                            ...postInputs,
                            username: e.target.value
                        }));
                    }}/>
                    <LabelledInput name="Password" type="password" placeholder="Enter your password" onchange={(e)=>{
                        setPostInputs(c =>({
                            ...postInputs,
                            password: e.target.value
                        }));
                    }}/>
                    <button type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === 'signup' ? 'Sign up' : 'Sign in'}</button>
                </div>
            </div>
        </div>
    )
}