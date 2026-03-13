import { useRouter } from "next/router";
//Open external links in new tab
function useGoToLink() {
  const router = useRouter();
  return (path: string | undefined, openInNewTab = false) => {
    if (!path) {
      return;
    }

    const isExternalLink =
      (path && path.length > 2 && path.slice(0, 2)) === "//";
    if (isExternalLink || openInNewTab) {
      const newWindow = window.open(path, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    } else {
      router.push(path);
    }
  };
}

export default useGoToLink;
