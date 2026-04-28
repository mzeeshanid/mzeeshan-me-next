import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Footer/Footer";
import MySeo from "@/components/Home/MySeo/MySeo";
import NavBar from "@/components/NavBar/NavBar";
import { Container, Spacer } from "@chakra-ui/react";
import React from "react";

type Props = {};

const ContactHome: React.FC<Props> = (props: Props) => {
  return (
    <>
      <MySeo />
      <Container p={0} maxW="full">
        {/* --- NavBar --- */}
        <NavBar />
        <main>
        <Spacer p={{ base: 4, lg: 8 }} />

        <Container maxW="6xl">
          <ContactForm />
        </Container>

        <Spacer p={4} />
        {/* --- Footer --- */}
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default ContactHome;
