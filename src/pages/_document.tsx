import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { AuthProvider } from "../utils/AuthContext";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <AuthProvider>
            <Main />
          </AuthProvider>
          <NextScript />
        </body>
      </Html>
    );
  }
}
