import React from "react"

interface BlogCardProps {
    authorName: string;
    title:string;
    content:string;
    publishedDate: string;
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps)=>{
    return (
        <div className="border-b pb-4 border-slate-200 p-2">
            <div className="flex">
                <div className="flex">
                    <Avatar name={authorName}/>
                </div>  
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="pl-2 flex flex-col justify-center">
                    <Circle />
                </div>
                <div className="pl-2 flex flex-col justify-center font-thin text-slate-400">
                    {publishedDate}
                </div>
            </div>
            <div className=" pt-2 text-xl font-bold">
                {title}
            </div>
            <div className="text-md font-medium">
                {content.slice(0,100) + "..."}
            </div>
            <div className="pt-4 text-slate-500 text-sm font-thin">
                {`${Math.ceil(content.length / 100)} minute(s)`}
            </div>
        </div>
    )
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">
        
    </div>
}
export function Avatar({name, size='small'}: {name : string, size?:'small'| 'big'}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${size === 'small' ? "w-6 h-6" : 'w-10 h-10'} dark:bg-gray-600`}>
        <span className={`text-sm text-gray-600 ${size === 'small' ? 'text-xs' : 'text-md'} dark:text-gray-300`}>{name[0]}</span>
    </div>
}