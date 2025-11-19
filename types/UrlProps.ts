export type UrlProps = {
    _id?: string;     // we want it to be optional because it's added by server after in insertion
    id: string;       // alias URL
    longUrl: string;  // original URL
};