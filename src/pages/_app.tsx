import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "../components/NavBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
