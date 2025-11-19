import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types/UrlProps";

export default async function getUrlsById(id: string): Promise<UrlProps | null> {
    const urlCollection = await getCollection(URL_COLLECTION);

    // need to find by alias, instead of Mongo ObjectId
    const data = await urlCollection.findOne({id});

    if (!data) {
        return null;
    }

    return {
        _id: data._id.toHexString(),
        id: data.id,
        longUrl: data.longUrl,
    };
}