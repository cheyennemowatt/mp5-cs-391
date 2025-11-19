import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types/UrlProps";

export default async function getAllUrls(): Promise<UrlProps[]> {
    const urlCollection = await getCollection(URL_COLLECTION);
    const data = await urlCollection.find().toArray();

    const urls: UrlProps[] = data.map((u) => ({
        _id: u._id.toHexString(),
        id: u.id,
        longUrl: u.longUrl,
    }));

    return urls.reverse();
}