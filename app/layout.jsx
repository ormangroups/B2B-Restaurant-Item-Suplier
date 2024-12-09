
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  
  title: 'OrmanIndia',
  description: 'This Is the Home Page of OrmanIndia ',
}
export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      
      <body>
        <Navbar isLoggedIn={true}/>
        <div className="mt-20 min-h-screen">
        {children}
        </div>
        
        <Footer/>
      </body>
    </html>
  );
}
