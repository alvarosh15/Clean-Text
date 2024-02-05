import { Cutive_Mono } from "next/font/google";
import "./globals.css";

const cutive_mono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cutive_mono.className}>{children}</body>
    </html>
  );
}
