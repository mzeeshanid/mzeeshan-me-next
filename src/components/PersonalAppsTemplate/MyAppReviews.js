import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  theme,
} from "@chakra-ui/react";

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={theme.colors.white}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: theme.colors.white,
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading color={theme.colors.teal[600]} as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text textAlign={"center"} color={theme.colors.gray[600]} fontSize={"sm"}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar alt={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text color={theme.colors.black} fontWeight={600}>
          {name}
        </Text>
        <Text fontSize={"sm"} color={theme.colors.gray[600]}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function MyAppReviews({ reviews }) {
  return (
    <Box bg={theme.colors.gray[100]}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading color={theme.colors.black}>App Reviews</Heading>
          <Text color={theme.colors.gray[600]}>
            Ratings and reviews given by AppStore users from around the world
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          {reviews.map((review, idx) => {
            return (
              <Testimonial key={idx}>
                <TestimonialContent>
                  <TestimonialHeading>{review.title}</TestimonialHeading>
                  <TestimonialText>{review.review}</TestimonialText>
                </TestimonialContent>
                <TestimonialAvatar
                  src={
                    "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  }
                  name={review.userName}
                  title={review.rating}
                />
              </Testimonial>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
