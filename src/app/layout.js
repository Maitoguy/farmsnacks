import {Space_Grotesk , Work_Sans} from "next/font/google";
import "./globals.css"
import Navbar from "./components/Navbar";

const spaceGrotesque = Space_Grotesk({
  subsets: ["Latin"],
  variable: "--font-space-grotesk"
});

const workSans = Work_Sans({
  subsets: ["Latin"],
  variable: "--font-work-sans"
})

export default function RootLayout({children}){

  return (
      <html lang="en">
        <body className={`${spaceGrotesque.variable} ${workSans.variable} bg-background text-on-background font-work`}>
          <Navbar />

          <main>
            {children}
          </main>

        </body>
      </html>
  )

}