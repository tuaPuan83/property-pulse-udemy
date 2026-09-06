import { Poppins } from "next/font/google";
import "@/assets/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
