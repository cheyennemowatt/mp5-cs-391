import React from "react";
import "./globals.css";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <title> MP-5 | CS-391</title>
        </head>
      <body>
        {children}
      </body>
    </html>
  );
}
