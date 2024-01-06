import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exercise App",
  description: "Your Awesome Exercise Friend that you always wanted!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="lg:mx-auto lg:max-w-screen-2xl">
            <Navbar />
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
