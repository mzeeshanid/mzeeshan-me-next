import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

type GistProps = {
  id: string;
  maxHeight?: number;
};

const normalizeGistId = (id: string) => id.replace(/^user-content-/, "");

const DEFAULT_MAX_HEIGHT = 500;

export const Gist: React.FC<GistProps> = ({
  id,
  maxHeight = DEFAULT_MAX_HEIGHT,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const gistId = normalizeGistId(id);

    const doc = iframe.contentDocument;
    if (!doc) return;

    iframe.srcdoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank" />
          <style>
            body {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <script src="https://gist.github.com/${gistId}.js"></script>
        </body>
      </html>
    `;
  }, [id]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: only accept messages from GitHub Gist
      if (!event.origin.includes("gist.github.com")) return;

      const iframe = iframeRef.current;
      if (!iframe) return;

      iframe.style.overflow = "auto";
      if (event.data?.type === "set-height") {
        const height = Math.min(event.data.height, maxHeight);
        iframe.style.height = `${height}px`;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [maxHeight]);

  return (
    <Box
      bg="bg.muted"
      my={6}
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="md"
      overflow="hidden"
    >
      <iframe
        ref={iframeRef}
        width="100%"
        height={maxHeight}
        style={{ border: "0" }}
        title="GitHub Gist"
      />
    </Box>
  );
};
