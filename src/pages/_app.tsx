import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "../components/NavBar";
import { Auth } from "../components/auth/Auth";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <NavBar />
          <Component {...pageProps} />
        </Auth>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
