import "./globals.css";
import { fira_sans } from "@/app/ui/fonts";


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
        {children}
      </body>
    </html>
  );
}
