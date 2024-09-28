import { ChangeEvent } from "react"

interface LabelledinputType{
    name:string;
    placeholder:string;
    onchange: (e: ChangeEvent<HTMLInputElement>)=> void;
    type?:string
}
export const LabelledInput = ({name, placeholder, onchange,type}: LabelledinputType)=>{
    return(
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-2">{name}</label>
            <input onChange={onchange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}