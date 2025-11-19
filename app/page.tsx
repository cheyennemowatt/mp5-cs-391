"use client";
import { useState } from "react";
import NewUrlForm from "@/components/NewUrlForm";
import UrlDisplay from "@/components/UrlDisplay";
import { UrlProps } from "@/types/UrlProps";

export default function Home() {
    const [createdUrl, setCreatedUrl] = useState<UrlProps | null>(null);
    return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-fuchsia-100">
                <NewUrlForm append={(url:UrlProps) => setCreatedUrl(url)} />
                {createdUrl && <UrlDisplay url={createdUrl} />}

            </div>

  );
}
