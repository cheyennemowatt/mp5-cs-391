"use client";
import { UrlProps } from "@/types/UrlProps";
import { useState } from "react";
import { Button } from "@mui/material";

export default function UrlDisplay({ url }: { url: UrlProps }) {
    const shortUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${url.id}`;
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="bg-pink-300 p-4 text-center mt-4 shadow  w-full  max-w-3xl  border border-pink-500 ">
            <p className="font-semibold mb-2">Your Shortened URL:</p>

            <p className="font-medium break-all text-white">
                <a
                    href={shortUrl}
                    target="_blank"
                    className=" underline"
                >
                    {shortUrl}
                </a>
            </p>

            <div className="w-full flex justify-center mt-6">
                <Button
                    sx={{ width: "100px" ,  mt: 3, background:"hotpink" }}
                    variant="contained"
                    onClick={handleCopy}
                >
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
        </div>
    );
}