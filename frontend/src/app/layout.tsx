import Navbar from "@/components/ui/custom/Navbar";
import "./globals.css";


export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Navbar />
        <main className="container mx-auto">
         {modal}
         {children}
         </main>
      </body>
    </html>
  );
}
