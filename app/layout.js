import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exercise App",
  description: "Your Awesome Exercise Friend that you always wanted!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <div className="lg:mx-auto lg:max-w-screen-2xl">{children}</div>
      </body>
    </html>
  );
}
