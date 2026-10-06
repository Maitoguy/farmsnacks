import { Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather"
});

// app/layout.js
export const metadata = {
  title: "Farm Snacks",
  description: "Fresh, healthy freeze-dried snacks straight from the farm.",
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${merriweather.variable} bg-background text-on-background font-merriweather`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>

    </html>
  );
}