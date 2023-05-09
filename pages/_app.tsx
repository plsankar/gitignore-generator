import TemplatesProvider from "@/contexts/TemplatesProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import toast, { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
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
