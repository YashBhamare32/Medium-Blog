import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./Labelledinput";
import { SigninType, UserType } from "../../types/UserTypes";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import Cookies from "js-cookie";

function afterSignin(token: string, authorName:string) {
    Cookies.set("token", token.split(' ')[0], {
        expires: 7, // Cookie expires in 7 days
        secure: true, // Only send cookie over HTTPS
        sameSite: "Strict", // Prevent CSRF
    });
    Cookies.set("authorName", authorName, {
        expires: 7, // Cookie expires in 7 days
        secure: true, // Only send cookie over HTTPS
        sameSite: "Strict", // Prevent CSRF
    });
}

async function auth({ type, postInputs }: { type: 'signup' | 'signin'; postInputs: UserType | SigninType }) {
    const url = `${BACKEND_URL}/api/v1/auth/${type}`;
    const res = await axios.post(url, postInputs);
    return res.data; // Return response data for further processing
}

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<UserType>({
        name: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleAuth = async () => {
        try {
            const sanitizedInputs = type === "signin" 
                ? { username: postInputs.username, password: postInputs.password }
                : postInputs;
            const data = await auth({ type, postInputs: sanitizedInputs });

            if (type === "signup") {
                navigate("/signin"); // Navigate after signup
            } else {
                afterSignin(data, sanitizedInputs.username); // Assuming token is returned as part of the response
                navigate("/blogs"); // Navigate after signin
            }
        } catch (error: any) {
            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                // TODO: remove alerts and send notifications
                alert(error.response.data.message);
                console.error("Error during authentication:", error.response.data);
            } else {
                console.error("Error during authentication:2", error.message);
            }
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10 mb-4">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Sign in"}
                        </div>
                        <div className="text-slate-600">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    {type === "signup" && (
                        <LabelledInput
                            name="Name"
                            placeholder="Enter your full name"
                            onchange={(e) => {
                                setPostInputs(c => ({
                                    ...postInputs,
                                    name: e.target.value
                                }));
                            }}
                        />
                    )}
                    <LabelledInput
                        name="Username"
                        placeholder="Enter your username"
                        onchange={(e) => {
                            setPostInputs(c => ({
                                ...postInputs,
                                username: e.target.value
                            }));
                        }}
                    />
                    <LabelledInput
                        name="Password"
                        type="password"
                        placeholder="Enter your password"
                        onchange={(e) => {
                            setPostInputs(c => ({
                                ...postInputs,
                                password: e.target.value
                            }));
                        }}
                    />
                    <button
                        onClick={handleAuth}
                        type="button"
                        className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        {type === 'signup' ? 'Sign up' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
};
