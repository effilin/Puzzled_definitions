
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapClient from './components/BootstrapClient';
import { UserProvider, PuzzleProvider, ThemeProvider, HelpfulProvider } from './provider';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import Footer from './components/Footer';




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Puzzled",
  description: "Puzzle contains a daily puzzle, weather, and a riddle",
  author: [{name: 'Eva Nummer'}]
};

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Bona+Nova+SC:ital,wght@0,400;0,700;1,400&family=Edu+AU+VIC+WA+NT+Pre:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"></link>

      </head>
      <body className={inter.className}>
        <ThemeProvider>
        <UserProvider>
        <PuzzleProvider>
        <HelpfulProvider>
          <NavBar />
          <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable  theme="light" /> 
            {children}
          <Footer />
        </HelpfulProvider>
        </PuzzleProvider>
        </UserProvider>
        </ThemeProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
