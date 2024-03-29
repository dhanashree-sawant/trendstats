import { Html, Head, Main, NextScript } from "next/document";
import Navigation from "@/pages/navigation/navigation";



export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <Main />
        <NextScript />
        </div>
      </body>
    </Html>
  );
}
