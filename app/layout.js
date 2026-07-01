import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata = {
  title: "Nicolas Portfolio",
  description:
    "Nicolas Portfolio, portafolio profesional de ingenieria de sistemas con experiencia, habilidades y certificados.",
  icons: {
    icon: "/logo.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
