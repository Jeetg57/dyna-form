import React from "react";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const FormPdf = ({ form }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Heading my={3}>{form.title}</Heading>
        <hr />
        <p>{form.customerCompanyName}</p>
        <p>{form.customerName}</p>
        <SimpleGrid my={3} columns={[1, null, 2]} spacing={5}>
          {form.formFields.map((field) => {
            return (
              <FormControl key={field.id} isRequired mr={3}>
                <FormLabel>{field.title} </FormLabel>
                <Input type={field.dataType} placeholder={field.title} />
              </FormControl>
            );
          })}
        </SimpleGrid>
      </Page>
    </Document>
  );
};
