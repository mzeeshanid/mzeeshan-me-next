import { toaster } from "@/components/ui/toaster";
import { useColorPalette } from "@/contexts/useColorPalette";
import useGoToLink from "@/hooks/useGoToLink";
import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { create } from "apisauce";
import { useEffect, useState } from "react";
import { FaCodeBranch, FaDownload, FaStar } from "react-icons/fa6";

/**
 * Props for the SectionHeader component.
 * @extends ButtonProps from Chakra UI
 */
export interface GithubInfoButtonProps extends ButtonProps {
  repoUrl: string;
  infoType: "stars" | "forks" | "download";
  children?: React.ReactNode;
}

type GithubApiResponse = {
  stargazers_count?: number;
  forks_count?: number;
};

function getRepoInfoFromUrl(repoUrl: string) {
  try {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)(\/|$)/);
    if (!match) return { owner: "", repo: "" };
    return { owner: match[1], repo: match[2] };
  } catch {
    return { owner: "", repo: "" };
  }
}

export const GithubInfoButton: React.FC<GithubInfoButtonProps> = ({
  repoUrl,
  infoType,
  ...rootProps
}) => {
  const { palette } = useColorPalette();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(
    infoType === "stars" || infoType === "forks"
  );

  useEffect(() => {
    if (infoType === "download") return;
    const { owner, repo } = getRepoInfoFromUrl(repoUrl);
    if (!owner || !repo) {
      setCount(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    const api = create({ baseURL: "https://api.github.com" });
    api.get<GithubApiResponse>(`/repos/${owner}/${repo}`).then((response) => {
      if (response.ok && response.data) {
        setCount(
          infoType === "stars"
            ? (response.data.stargazers_count ?? 0)
            : (response.data.forks_count ?? 0)
        );
      } else {
        setCount(0);
        toaster.create({
          title: "GitHub",
          description: "Could not fetch repository info.",
          type: "error",
          duration: 3000,
          closable: true,
        });
      }
      setLoading(false);
    });
  }, [repoUrl, infoType]);

  // Download repo zip
  const handleDownload = () => {
    const { owner, repo } = getRepoInfoFromUrl(repoUrl);
    if (!owner || !repo) {
      toaster.create({
        title: "Invalid Repo URL",
        description: "Cannot download zip for invalid repository.",
        type: "error",
        duration: 3000,
        closable: true,
      });
      return;
    }
    window.open(
      `https://github.com/${owner}/${repo}/archive/master.zip`,
      "_blank"
    );
  };

  if (infoType === "download") {
    return (
      <Button
        variant="surface"
        colorPalette={palette}
        onClick={handleDownload}
        {...rootProps}
      >
        <HStack>
          <Icon as={FaDownload} />
          <Text>{"Download"}</Text>
        </HStack>
      </Button>
    );
  }

  // For stars and forks
  const icon = infoType === "stars" ? FaStar : FaCodeBranch;
  const label = infoType === "stars" ? "Stars" : "Forks";

  const gotolink = useGoToLink();

  const handleRepoClick = () => {
    gotolink(repoUrl);
  };

  return (
    <Button
      variant={"surface"}
      colorPalette={palette}
      p={0}
      onClick={handleRepoClick}
      {...rootProps}
    >
      <HStack w="full" h="full" gap={0} overflow="clip">
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={4}
          pl={4}
          pr={4}
          borderRight={"1px solid"}
          borderColor={`${palette}.emphasized`}
        >
          <Icon as={icon} mr={2} color={`${palette}.fg`} />
          <Text fontWeight="bold" fontSize="sm" color={`${palette}.fg`}>
            {label}
          </Text>
        </Box>
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={2}
          pl={4}
          pr={4}
          minW={"64px"}
        >
          {loading ? (
            <Spinner size="sm" colorPalette={palette} />
          ) : (
            <Text fontWeight="bold" fontSize="md">
              {count ?? 0}
            </Text>
          )}
        </Box>
      </HStack>
    </Button>
  );
};
