import React from "react";
import Head from "next/head";

import {
  Box,
  Center,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  LightMode,
  theme,
} from "@chakra-ui/react";

import myNavItems from "../src/data/myNavItems";
import AppNavBar from "../src/components/AppNavBar";

import { chakra } from "@chakra-ui/system";

import AppHeadingText from "../src/components/AppHeadingText";
import AppFooter from "../src/components/AppFooter";
import { NextSeo } from "next-seo";
import appGenericMeta from "../src/data/appGenericMeta";

export default function Privacy() {
  const navItems = [...myNavItems()];
  const metaData = appGenericMeta();
  return (
    <LightMode>
      <NextSeo title={`Privacy - ${metaData.title}`} />
      <AppNavBar navItems={navItems} />
      <Center bg={theme.colors.white}>
        <Box maxW={"1024px"} w={"100%"} bg={theme.colors.white} p={4}>
          <AppHeadingText
            heading="Privacy Policy"
            headingColor={theme.colors.black}
            bg={theme.colors.white}
          />
          <Box p={4} />
          <Text color={theme.colors.black}>
            Your privacy is important to us. It is our policy to respect your
            privacy and comply with any applicable law and regulation regarding
            any personal information we may collect about you, including across
            our website,{" "}
            <chakra.span>
              <chakra.span as="b">
                <Link href={"https://www.mzeeshan.me/"} isExternal={true}>
                  https://www.mzeeshan.me/
                </Link>
              </chakra.span>
              , and other sites we own and operate.{" "}
            </chakra.span>
          </Text>
          <Text color={theme.colors.black}>
            This policy is effective as of 9 September 2021 and was last updated
            on 9 September 2021.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Information We Collect
          </Heading>
          <Text color={theme.colors.black}>
            Information we collect includes both information you knowingly and
            actively provide us when using or participating in any of our
            services and promotions, and any information automatically sent by
            your devices in the course of accessing our products and services.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Log Data
          </Heading>
          <Text color={theme.colors.black}>
            When you visit our website, our servers may automatically log the
            standard data provided by your web browser. It may include your
            device’s Internet Protocol (IP) address, your browser type and
            version, the pages you visit, the time and date of your visit, the
            time spent on each page, other details about your visit, and
            technical details that occur in conjunction with any errors you may
            encounter.{" "}
          </Text>
          <Text color={theme.colors.black}>
            Please be aware that while this information may not be personally
            identifying by itself, it may be possible to combine it with other
            data to personally identify individual persons.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Collection and Use of Information
          </Heading>
          <Text color={theme.colors.black}>
            We may collect personal information from you when you do any of the
            following on our website:{" "}
          </Text>
          <UnorderedList color={theme.colors.black}>
            <ListItem>
              <Text color={theme.colors.black}>
                Use a mobile device or web browser to access our content
              </Text>
            </ListItem>
            <ListItem>
              <Text color={theme.colors.black}>
                Contact me via email, social media, or on any similar
                technologies
              </Text>
            </ListItem>
            <ListItem>
              <Text color={theme.colors.black}>
                When you mention us on social media
              </Text>
            </ListItem>
          </UnorderedList>
          <Text color={theme.colors.black}>
            We may collect, hold, use, and disclose information for the
            following purposes, and personal information will not be further
            processed in a manner that is incompatible with these purposes:{" "}
          </Text>
          <Text color={theme.colors.black}>
            Please be aware that we may combine information we collect about you
            with general information or research data we receive from other
            trusted sources.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Security of Your Personal Information
          </Heading>
          <Text color={theme.colors.black}>
            When we collect and process personal information, and while we
            retain this information, we will protect it within commercially
            acceptable means to prevent loss and theft, as well as unauthorized
            access, disclosure, copying, use, or modification.{" "}
          </Text>
          <Text color={theme.colors.black}>
            Although we will do our best to protect the personal information you
            provide to us, we advise that no method of electronic transmission
            or storage is 100% secure, and no one can guarantee absolute data
            security. We will comply with laws applicable to us in respect of
            any data breach.{" "}
          </Text>
          <Text color={theme.colors.black}>
            You are responsible for selecting any password and its overall
            security strength, ensuring the security of your own information
            within the bounds of our services.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            How Long We Keep Your Personal Information
          </Heading>
          <Text color={theme.colors.black}>
            We keep your personal information only for as long as we need to.
            This time period may depend on what we are using your information
            for, in accordance with this privacy policy. If your personal
            information is no longer required, we will delete it or make it
            anonymous by removing all details that identify you.{" "}
          </Text>
          <Text color={theme.colors.black}>
            However, if necessary, we may retain your personal information for
            our compliance with a legal, accounting, or reporting obligation or
            for archiving purposes in the public interest, scientific, or
            historical research purposes or statistical purposes.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Children’s Privacy
          </Heading>
          <Text color={theme.colors.black}>
            We do not aim any of our products or services directly at children
            under the age of 13, and we do not knowingly collect personal
            information about children under 13.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Disclosure of Personal Information to Third Parties
          </Heading>
          <Text color={theme.colors.black}>
            We may disclose personal information to:{" "}
          </Text>
          <UnorderedList color={theme.colors.black}>
            <ListItem>
              <Text>a parent, subsidiary, or affiliate of our company</Text>
            </ListItem>
            <ListItem>
              <Text>
                third party service providers for the purpose of enabling them
                to provide their services, for example, IT service providers,
                data storage, hosting and server providers, advertisers, or
                analytics platforms
              </Text>
            </ListItem>
            <ListItem>
              <Text>our employees, contractors, and/or related entities</Text>
            </ListItem>
            <ListItem>
              <Text>our existing or potential agents or business partners</Text>
            </ListItem>
            <ListItem>
              <Text>
                sponsors or promoters of any competition, sweepstakes, or
                promotion we run
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                courts, tribunals, regulatory authorities, and law enforcement
                officers, as required by law, in connection with any actual or
                prospective legal proceedings, or in order to establish,
                exercise, or defend our legal rights
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                third parties, including agents or sub-contractors, who assist
                us in providing information, products, services, or direct
                marketing to you third parties to collect and process data
              </Text>
            </ListItem>
          </UnorderedList>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            International Transfers of Personal Information
          </Heading>
          <Text color={theme.colors.black}>
            The personal information we collect is stored and/or processed where
            we or our partners, affiliates, and third-party providers maintain
            facilities. Please be aware that the locations to which we store,
            process, or transfer your personal information may not have the same
            data protection laws as the country in which you initially provided
            the information. If we transfer your personal information to third
            parties in other countries: (i) we will perform those transfers in
            accordance with the requirements of applicable law; and (ii) we will
            protect the transferred personal information in accordance with this
            privacy policy.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Your Rights and Controlling Your Personal Information
          </Heading>
          <Text color={theme.colors.black}>
            You always retain the right to withhold personal information from
            us, with the understanding that your experience of our website may
            be affected. We will not discriminate against you for exercising any
            of your rights over your personal information. If you do provide us
            with personal information you understand that we will collect, hold,
            use and disclose it in accordance with this privacy policy. You
            retain the right to request details of any personal information we
            hold about you.{" "}
          </Text>
          <Text color={theme.colors.black}>
            If we receive personal information about you from a third party, we
            will protect it as set out in this privacy policy. If you are a
            third party providing personal information about somebody else, you
            represent and warrant that you have such person’s consent to provide
            the personal information to us.{" "}
          </Text>
          <Text color={theme.colors.black}>
            If you have previously agreed to us using your personal information
            for direct marketing purposes, you may change your mind at any time.
            We will provide you with the ability to unsubscribe from our
            email-database or opt out of communications. Please be aware we may
            need to request specific information from you to help us confirm
            your identity.{" "}
          </Text>
          <Text color={theme.colors.black}>
            If you believe that any information we hold about you is inaccurate,
            out of date, incomplete, irrelevant, or misleading, please contact
            us using the details provided in this privacy policy. We will take
            reasonable steps to correct any information found to be inaccurate,
            incomplete, misleading, or out of date.{" "}
          </Text>
          <Text color={theme.colors.black}>
            If you believe that we have breached a relevant data protection law
            and wish to make a complaint, please contact me using the details
            below and provide us with full details of the alleged breach. We
            will promptly investigate your complaint and respond to you, in
            writing, setting out the outcome of our investigation and the steps
            we will take to deal with your complaint. You also have the right to
            contact a regulatory body or data protection authority in relation
            to your complaint.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Use of Cookies
          </Heading>
          <Text color={theme.colors.black}>
            We use &ldquo;cookies&rdquo; to collect information about you and
            your activity across our site. A cookie is a small piece of data
            that our website stores on your computer, and accesses each time you
            visit, so we can understand how you use our site. This helps us
            serve you content based on preferences you have specified.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Limits of Our Policy
          </Heading>
          <Text color={theme.colors.black}>
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            policies of those sites, and cannot accept responsibility or
            liability for their respective privacy practices.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Changes to This Policy
          </Heading>
          <Text color={theme.colors.black}>
            At our discretion, we may change our privacy policy to reflect
            updates to our business processes, current acceptable practices, or
            legislative or regulatory changes. If we decide to change this
            privacy policy, we will post the changes here at the same link by
            which you are accessing this privacy policy.{" "}
          </Text>
          <Text color={theme.colors.black}>
            If required by law, we will get your permission or give you the
            opportunity to opt in to or opt out of, as applicable, any new uses
            of your personal information.{" "}
          </Text>
          <Heading size="md" pt={2} pb={2} color={theme.colors.black}>
            Contact Me
          </Heading>
          <Text color={theme.colors.black}>
            For any questions or concerns regarding your privacy, you may
            contact me using the following details:{" "}
            <chakra.span as="b">
              <Link isExternal={true} href="mailto:mzeeshanid@yahoo.com">
                mzeeshanid@yahoo.com
              </Link>
            </chakra.span>
          </Text>
        </Box>
      </Center>
      <AppFooter />
    </LightMode>
  );
}
