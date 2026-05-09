import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { AuthProvider } from "./context/authContext";
import ApolloWrapper from "@/providers/ApolloWrapper";

export const metadata: Metadata = {
  title: "AI Interview Platform",
  description: "AI-powered interview preparation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <AuthProvider>
          <ApolloWrapper >
              {children}
          </ApolloWrapper>
        
        </AuthProvider>
      </body>
    </html>
  );
}