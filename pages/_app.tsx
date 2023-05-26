import TemplatesProvider from "@/contexts/TemplatesProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'GA_MEASUREMENT_ID');
                `}
            </Script>
            <SWRConfig
                value={{
                    fetcher: (resource, init) =>
                        fetch(resource, init).then((res) => res.json()),
                }}
            >
                <TemplatesProvider>
                    <Component {...pageProps} />
                </TemplatesProvider>
            </SWRConfig>
            <Toaster position="bottom-center" />
        </>
    );
}
