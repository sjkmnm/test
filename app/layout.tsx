import "styles/globals.css";
import Header from "components/header";
import Footer from "components/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Font Awesomeの設定
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CUBE",
    template: "%s | CUBE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
