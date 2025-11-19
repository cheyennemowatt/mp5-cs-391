"use client";

import { useState } from "react";
import { TextField, Button, FormHelperText } from "@mui/material";
import createNewUrl from "@/lib/createNewUrl";
import {UrlProps} from "@/types/UrlProps"; // <-- SERVER ACTION

export default function NewUrlForm({
                                          append,
                                      }: {
    append: (data: UrlProps) => void;
}) {
    const [error, setError] = useState("");

    return (

        <form
            className="w-full max-w-3xl bg-pink-200  p-10 shadow-xl
               border border-pink-500"

            action={async (formData) => {
                // Server Action call
                try {
                    const newUrl = await createNewUrl(formData);
                    if ("error" in newUrl) {
                        setError(newUrl.error);
                        return;
                    }
                    setError("");
                    append(newUrl);
                } catch (err: any) {
                    setError(err.message);
                }
            }}
        >
            <header className="flex overflow-x-hidden rounded-md flex-col items-center justify-center text-center bg-gradient-to-r bg-pink-500 text-white shadow-lg ">
                <h1 className="text-4xl font-extrabold drop-shadow-md">Cheyenne's URL Shortener</h1>
                <p className=" text-lg opacity-90 ">Shorten your long URLs into compact, shareable links</p>
            </header>
            <h1 className="!mt-6 ">Long URL</h1>
            <div className="flex flex-col bg-white rounded-md px-3 py-2 shadow mb-2">
                <input
                    className="outline-none mt-1 font-medium"
                    type="text"
                    name="longUrl"
                    placeholder="https://example.com/very-long-link"
                />
            </div>
            <h1  className="!mt-6 ">Custom Alias</h1>
            <div className="flex items-center bg-white rounded-md px-3 py-2 shadow">
                <span className="text-gray-500 font-medium mr-1">
                    {typeof window !== "undefined" ? window.location.origin + "/" : ""}
                </span>
                <input
                    className="outline-none flex-1 font-medium"
                    type="text"
                    name="alias"
                    placeholder="your-custom-alias"
                />
            </div>
            {error && (
                <p className="text-red-700 font-semibold mt-1">
                    {error}
                </p>
            )}

            <div className="w-full flex justify-center mt-6 ">
                <Button sx={{ width: "100px" ,background:"hotpink" , mt: 3}}  variant="contained" type="submit">
                    Shorten
                </Button>
            </div>
        </form>

    );
}