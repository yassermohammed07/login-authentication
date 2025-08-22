import "./globals.css";
import { Roboto } from "next/font/google";

const font = Roboto ({
  weight: ['100', '200', '300','400','500','600','700','800','900'],
  subsets: ["latin"],
});

export const metadata = {
  title: "My Porfolio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${font.className} antialiased bg-black/90`}>
        {children}
      </body>
    </html>
  );
}
