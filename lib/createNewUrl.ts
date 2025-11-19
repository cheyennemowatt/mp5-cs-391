"use server";

import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types/UrlProps";

export default async function createNewUrl(formData: FormData): Promise<UrlProps | { error: string }> {
    const alias = formData.get("alias") as string;
    const longUrl = formData.get("longUrl") as string;

    if (!alias || !longUrl) {
        return { error: "Alias and URL are required." };
    }

    // Validate URL
    try {
        new URL(longUrl);
    } catch {
        return { error: "Invalid URL" };
    }

    const col = await getCollection(URL_COLLECTION);

    // Check for duplicates
    const exists = await col.findOne({ id: alias });
    if (exists) {
        return { error: "Alias already taken" };
    }

    // Insert document
    const res = await col.insertOne({ id: alias, longUrl });

    if (!res.acknowledged) {
        return { error: "DB insert failed" };
    }

    // IMPORTANT: Convert ObjectId → string
    return {
        _id: res.insertedId.toHexString(),
        id: alias,
        longUrl: longUrl,
    };
}