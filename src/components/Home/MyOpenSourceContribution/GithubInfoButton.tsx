import { css, cx } from "styled-system/css";
import { hstack } from "styled-system/patterns";
import { button, spinner } from "styled-system/recipes";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import { toaster } from "@/components/ui/toaster";
import useGoToLink from "@/hooks/useGoToLink";
import { create } from "apisauce";
import { useEffect, useState } from "react";
import { FaCodeBranch, FaDownload, FaStar } from "react-icons/fa6";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";

export interface GithubInfoButtonProps {
  repoUrl: string;
  infoType: "stars" | "forks" | "download";
  className?: string;
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
  className,
}) => {
  const { palette } = useColorPalette();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(
    infoType === "stars" || infoType === "forks",
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
            : (response.data.forks_count ?? 0),
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
    window.open(`https://github.com/${owner}/${repo}/archive/master.zip`, "_blank");
  };

  const gotolink = useGoToLink();

  const baseButtonClass = cx(
    paletteCva({ palette: palette as PaletteCvaKey }),
    button({ variant: "surface" }),
    css({ p: "0", overflow: "clip" }),
    className,
  );

  if (infoType === "download") {
    return (
      <button className={baseButtonClass} onClick={handleDownload}>
        <div className={hstack({ px: "4", py: "2" })}>
          <DeferredIcon icon={FaDownload} size="sm" />
          <span>{"Download"}</span>
        </div>
      </button>
    );
  }

  const icon = infoType === "stars" ? FaStar : FaCodeBranch;
  const label = infoType === "stars" ? "Stars" : "Forks";

  return (
    <button
      className={baseButtonClass}
      onClick={() => gotolink(repoUrl)}
    >
      <div className={hstack({ w: "full", h: "full", gap: "0", overflow: "clip" })}>
        <div
          className={cx(
            paletteCva({ palette: palette as PaletteCvaKey }),
            css({
              flex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: "4",
              px: "4",
              borderRight: "1px solid",
              borderColor: "colorPalette.emphasized",
            }),
          )}
        >
          <DeferredIcon icon={icon} size="sm" color={`${palette}.fg`} />
          <span className={css({ fontWeight: "bold", fontSize: "sm", color: "colorPalette.fg", ml: "2" })}>
            {label}
          </span>
        </div>
        <div
          className={css({
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: "2",
            px: "4",
            minW: "64px",
          })}
        >
          {loading ? (
            <span
              className={cx(
                paletteCva({ palette: palette as PaletteCvaKey }),
                spinner({ size: "sm" }),
              )}
            />
          ) : (
            <span className={css({ fontWeight: "bold", fontSize: "md" })}>
              {count ?? 0}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
