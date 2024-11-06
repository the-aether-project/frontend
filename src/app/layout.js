import "./globals.css";
import { fira_sans } from "./ui/fonts";
// import SessionWrapper from "./ui/components/SessionWrapper";
import Navbar from "./ui/components/Navbar";
import Footer from "./ui/components/Footer";
export const metadata = {
  title: {
    template: "%s | aether",
    default: "aether"
  },
  description: "Remote Desktop Sharing App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fira_sans.className} antialiased`}
      >
        {/* <SessionWrapper> */}
        <Navbar />
        <div className="min-h-screen   bg-[size:20px_20px]"
          style={{ paddingTop: "var(--navbar-height)" }}>
          {children}
        </div>
        <Footer />
        {/* </SessionWrapper> */}
      </body>
    </html>
  );
}
