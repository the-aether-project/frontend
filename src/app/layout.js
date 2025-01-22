
import "./globals.css";
import { fira_sans } from "@/components/fonts";
import Navbar from "@/components/ui/Navbar";
import Footer from "./../components/ui/Footer";
import PageWrapper from "@/components/ui/PageWrapper";
import { ThemeProvider } from "@/components/ui/DarkMode/ThemeProvider";
import SessionProvider from "@/components/ui/SessionProvider";

export const metadata = {
  title: {
    template: "%s | aether",
    default: "Aether"
  },
  description: "Remote Desktop Sharing App",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={`${fira_sans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         
          <SessionProvider>
            <Navbar />
            <main className="min-h-screen bg-[size:20px_20px]">
              <PageWrapper>
                {children}
              </PageWrapper>
            </main>
            <Footer />
          
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}