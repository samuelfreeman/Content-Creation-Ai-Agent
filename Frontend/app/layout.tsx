import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <div className="flex flex-col min-h-screen">
          <Navbar />
           <main className="flex-1 flex flex-col">
              {children}
           </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}