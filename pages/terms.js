import {
  Box,
  Center,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  theme,
} from "@chakra-ui/react";

import { LightMode, chakra } from "@chakra-ui/system";
import { NextSeo } from "next-seo";
import React from "react";
import AppFooter from "../src/components/AppFooter";
import AppHeadingText from "../src/components/AppHeadingText";
import AppNavBar from "../src/components/AppNavBar";
import appGenericMeta from "../src/data/appGenericMeta";
import myNavItems from "../src/data/myNavItems";

export default function Terms() {
  const navItems = [...myNavItems()];
  const metaData = appGenericMeta();
  return (
    <LightMode>
      <NextSeo title={`Terms - ${metaData.title}`} />
      <AppNavBar navItems={navItems} />
      <Center w="100%" bg={theme.colors.white}>
        <Box p={4} w={"100%"} maxW={"1024px"}>
          <Box>
            <AppHeadingText
              heading="Terms and Conditions"
              bg={theme.colors.white}
              headingColor={theme.colors.black}
              as="h1"
            />
            <Box textAlign="center">
              <Text color={theme.colors.black}>
                Last updated: September 08, 2021
              </Text>
              <Text color={theme.colors.black}>
                Please read these terms and conditions carefully before using
                Our Service.
              </Text>
            </Box>
            <Box>
              <Heading pt={4} pb={4} color={theme.colors.black}>
                Interpretation and Definitions
              </Heading>
              <Heading pt={2} pb={2} size="md" color={theme.colors.black}>
                Interpretation
              </Heading>
              <Text color={theme.colors.black}>
                The words of which the initial letter is capitalized have
                meanings defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </Text>
              <Heading pt={2} pb={2} size="md" color={theme.colors.black}>
                Definitions
              </Heading>
              <Text color={theme.colors.black}>
                For the purposes of these Terms and Conditions:
              </Text>
              <Box textAlign="left">
                <UnorderedList color={theme.colors.black}>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">Affiliate</chakra.span>
                      <chakra.span>
                        {`${" "}`}means an entity that controls, is controlled
                        by or is under common control with a party, where
                        &quot;control&quot; means ownership of 50% or more of
                        the shares, equity interest or other securities entitled
                        to vote for election of directors or other managing
                        authority.
                      </chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">Country</chakra.span>
                      <chakra.span>{`${" "}`}refers to: Pakistan</chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">Company</chakra.span>
                      <chakra.span>
                        {`${" "}`}(referred to as either &quot;the
                        Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                        &quot;Our&quot; in this Agreement) refers to Muhammad
                        Zeeshan.
                      </chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">Device</chakra.span>
                      <chakra.span>
                        {`${" "}`}means any device that can access the Service
                        such as a computer, a cellphone or a digital tablet.
                      </chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">Service</chakra.span>
                      <chakra.span>
                        {`${" "}`}refers to the Website.
                      </chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">Terms and Conditions</chakra.span>
                      <chakra.span>
                        {`${" "}`}(also referred as &quot;Terms&quot;) mean
                        these Terms and Conditions that form the entire
                        agreement between You and the Company regarding the use
                        of the Service.
                      </chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">
                        Third-party Social Media Service
                      </chakra.span>
                      <chakra.span>
                        {`${" "}`}means any services or content (including data,
                        information, products or services) provided by a
                        third-party that may be displayed, included or made
                        available by the Service.
                      </chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">Website</chakra.span>
                      <chakra.span>
                        {`${" "}`}refers to Muhammad Zeeshan, accessible from{" "}
                        <Link isExternal={true} href="https://www.mzeeshan.me">
                          https://www.mzeeshan.me
                        </Link>
                        <chakra.span>.</chakra.span>
                      </chakra.span>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color={theme.colors.black}>
                      <chakra.span as="b">You</chakra.span>
                      <chakra.span>
                        {`${" "}`}means the individual accessing or using the
                        Service, or the company, or other legal entity on behalf
                        of which such individual is accessing or using the
                        Service, as applicable.
                      </chakra.span>
                    </Text>
                  </ListItem>
                </UnorderedList>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Acknowledgment
                </Heading>
                <Text color={theme.colors.black}>
                  These are the Terms and Conditions governing the use of this
                  Service and the agreement that operates between You and the
                  Company. These Terms and Conditions set out the rights and
                  obligations of all users regarding the use of the Service.
                </Text>
                <Text color={theme.colors.black}>
                  Your access to and use of the Service is conditioned on Your
                  acceptance of and compliance with these Terms and Conditions.
                  These Terms and Conditions apply to all visitors, users and
                  others who access or use the Service.
                </Text>
                <Text color={theme.colors.black}>
                  By accessing or using the Service You agree to be bound by
                  these Terms and Conditions. If You disagree with any part of
                  these Terms and Conditions then You may not access the
                  Service.
                </Text>
                <Text color={theme.colors.black}>
                  You represent that you are over the age of 18. The Company
                  does not permit those under 18 to use the Service.
                </Text>
                <Text color={theme.colors.black}>
                  Your access to and use of the Service is also conditioned on
                  Your acceptance of and compliance with the Privacy Policy of
                  the Company. Our Privacy Policy describes Our policies and
                  procedures on the collection, use and disclosure of Your
                  personal information when You use the Application or the
                  Website and tells You about Your privacy rights and how the
                  law protects You. Please read Our Privacy Policy carefully
                  before using Our Service.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Links to Other Websites
                </Heading>
                <Text color={theme.colors.black}>
                  Our Service may contain links to third-party web sites or
                  services that are not owned or controlled by the Company.
                </Text>
                <Text color={theme.colors.black}>
                  The Company has no control over, and assumes no responsibility
                  for, the content, privacy policies, or practices of any third
                  party web sites or services. You further acknowledge and agree
                  that the Company shall not be responsible or liable, directly
                  or indirectly, for any damage or loss caused or alleged to be
                  caused by or in connection with the use of or reliance on any
                  such content, goods or services available on or through any
                  such web sites or services.
                </Text>
                <Text color={theme.colors.black}>
                  We strongly advise You to read the terms and conditions and
                  privacy policies of any third-party web sites or services that
                  You visit.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Termination
                </Heading>
                <Text color={theme.colors.black}>
                  We may terminate or suspend Your access immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if You breach these Terms and
                  Conditions.
                </Text>
                <Text color={theme.colors.black}>
                  Upon termination, Your right to use the Service will cease
                  immediately.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Limitation of Liability
                </Heading>
                <Text color={theme.colors.black}>
                  Notwithstanding any damages that You might incur, the entire
                  liability of the Company and any of its suppliers under any
                  provision of this Terms and Your exclusive remedy for all of
                  the foregoing shall be limited to the amount actually paid by
                  You through the Service or 100 USD if You haven&apos;t
                  purchased anything through the Service.
                </Text>
                <Text color={theme.colors.black}>
                  To the maximum extent permitted by applicable law, in no event
                  shall the Company or its suppliers be liable for any special,
                  incidental, indirect, or consequential damages whatsoever
                  (including, but not limited to, damages for loss of profits,
                  loss of data or other information, for business interruption,
                  for personal injury, loss of privacy arising out of or in any
                  way related to the use of or inability to use the Service,
                  third-party software and/or third-party hardware used with the
                  Service, or otherwise in connection with any provision of this
                  Terms), even if the Company or any supplier has been advised
                  of the possibility of such damages and even if the remedy
                  fails of its essential purpose.
                </Text>
                <Text color={theme.colors.black}>
                  Some states do not allow the exclusion of implied warranties
                  or limitation of liability for incidental or consequential
                  damages, which means that some of the above limitations may
                  not apply. In these states, each party&apos;s liability will
                  be limited to the greatest extent permitted by law.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
                </Heading>
                <Text color={theme.colors.black}>
                  The Service is provided to You &quot;AS IS&quot; and &quot;AS
                  AVAILABLE&quot; and with all faults and defects without
                  warranty of any kind. To the maximum extent permitted under
                  applicable law, the Company, on its own behalf and on behalf
                  of its Affiliates and its and their respective licensors and
                  service providers, expressly disclaims all warranties, whether
                  express, implied, statutory or otherwise, with respect to the
                  Service, including all implied warranties of merchantability,
                  fitness for a particular purpose, title and non-infringement,
                  and warranties that may arise out of course of dealing, course
                  of performance, usage or trade practice. Without limitation to
                  the foregoing, the Company provides no warranty or
                  undertaking, and makes no representation of any kind that the
                  Service will meet Your requirements, achieve any intended
                  results, be compatible or work with any other software,
                  applications, systems or services, operate without
                  interruption, meet any performance or reliability standards or
                  be error free or that any errors or defects can or will be
                  corrected.
                </Text>
                <Text color={theme.colors.black}>
                  Without limiting the foregoing, neither the Company nor any of
                  the company&apos;s provider makes any representation or
                  warranty of any kind, express or implied: (i) as to the
                  operation or availability of the Service, or the information,
                  content, and materials or products included thereon; (ii) that
                  the Service will be uninterrupted or error-free; (iii) as to
                  the accuracy, reliability, or currency of any information or
                  content provided through the Service; or (iv) that the
                  Service, its servers, the content, or e-mails sent from or on
                  behalf of the Company are free of viruses, scripts, trojan
                  horses, worms, malware, timebombs or other harmful components.
                </Text>
                <Text color={theme.colors.black}>
                  Some jurisdictions do not allow the exclusion of certain types
                  of warranties or limitations on applicable statutory rights of
                  a consumer, so some or all of the above exclusions and
                  limitations may not apply to You. But in such a case the
                  exclusions and limitations set forth in this section shall be
                  applied to the greatest extent enforceable under applicable
                  law.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Governing Law
                </Heading>
                <Text color={theme.colors.black}>
                  The laws of the Country, excluding its conflicts of law rules,
                  shall govern this Terms and Your use of the Service. Your use
                  of the Application may also be subject to other local, state,
                  national, or international laws.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Disputes Resolution
                </Heading>
                <Text color={theme.colors.black}>
                  If You have any concern or dispute about the Service, You
                  agree to first try to resolve the dispute informally by
                  contacting the Company.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  For European Union (EU) Users
                </Heading>
                <Text color={theme.colors.black}>
                  If You are a European Union consumer, you will benefit from
                  any mandatory provisions of the law of the country in which
                  you are resident in.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  United States Legal Compliance
                </Heading>
                <Text color={theme.colors.black}>
                  You represent and warrant that (i) You are not located in a
                  country that is subject to the United States government
                  embargo, or that has been designated by the United States
                  government as a &quot;terrorist supporting&quot; country, and
                  (ii) You are not listed on any United States government list
                  of prohibited or restricted parties.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Severability and Waiver
                </Heading>
                <h2>Severability</h2>
                <Text color={theme.colors.black}>
                  If any provision of these Terms is held to be unenforceable or
                  invalid, such provision will be changed and interpreted to
                  accomplish the objectives of such provision to the greatest
                  extent possible under applicable law and the remaining
                  provisions will continue in full force and effect.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Waiver
                </Heading>
                <Text color={theme.colors.black}>
                  Except as provided herein, the failure to exercise a right or
                  to require performance of an obligation under this Terms shall
                  not effect a party&apos;s ability to exercise such right or
                  require such performance at any time thereafter nor shall be
                  the waiver of a breach constitute a waiver of any subsequent
                  breach.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Translation Interpretation
                </Heading>
                <Text color={theme.colors.black}>
                  These Terms and Conditions may have been translated if We have
                  made them available to You on our Service. You agree that the
                  original English text shall prevail in the case of a dispute.
                </Text>
                <Heading pt={2} pb={2} size={"md"} color={theme.colors.black}>
                  Changes to These Terms and Conditions
                </Heading>
                <Text color={theme.colors.black}>
                  We reserve the right, at Our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material We
                  will make reasonable efforts to provide at least 30 days&apos;
                  notice prior to any new terms taking effect. What constitutes
                  a material change will be determined at Our sole discretion.
                </Text>
                <Text color={theme.colors.black}>
                  By continuing to access or use Our Service after those
                  revisions become effective, You agree to be bound by the
                  revised terms. If You do not agree to the new terms, in whole
                  or in part, please stop using the website and the Service.
                </Text>
                <Heading size="md" color={theme.colors.black}>
                  Contact Me
                </Heading>
                <Text color={theme.colors.black}>
                  <chakra.span>
                    If you have any questions about these Terms and Conditions,
                    You can contact me:
                  </chakra.span>
                  <chakra.span as="b">
                    <Link href="mailto: mzeeshanid@yahoo.com">
                      {" "}
                      mzeeshanid@yahoo.com
                    </Link>
                  </chakra.span>
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Center>
      <AppFooter />
    </LightMode>
  );
}
