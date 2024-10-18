import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FilterProvider } from '@/context/FilterContext';

function MyStore({ Component, pageProps }: AppProps) {
  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  );
}

export default MyStore;