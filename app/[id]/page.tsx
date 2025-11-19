import getUrlsById from "@/lib/getUrlsById";
import { redirect } from "next/navigation";

export default async function UrlRedirectPage({
                                                  params,
                                              }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let urlDoc = null;

    try {
        urlDoc = await getUrlsById(id);
    } catch (err) {
        console.log("This error occurred:", err);
        redirect("/");
    }

    if (!urlDoc) {
        redirect("/");
    }

    // redirect to the actual long URL
    redirect(urlDoc.longUrl);
}