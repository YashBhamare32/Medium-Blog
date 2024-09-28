import React from "react"
import { Avatar } from "./BlogCard"

export const AppBar = ()=>{
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center font-semibold text-xl">
            Medium
        </div>
        <div>
            <Avatar name="Yash Bhamare" size="big"/>
        </div>
    </div>
}