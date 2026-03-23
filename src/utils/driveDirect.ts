export const isValidGoogleDriveShareableLink = (value: string): boolean => {
  try {
    const url = new URL(value);
    const urlComponents = value.split("/");

    return (
      url.hostname === "drive.google.com" &&
      urlComponents.length > 5 &&
      !!urlComponents[5]
    );
  } catch {
    return false;
  }
};

export const extractGoogleDriveFileId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const idFromQuery = parsed.searchParams.get("id");

    if (idFromQuery) {
      return idFromQuery;
    }

    const parts = parsed.pathname.split("/");
    return parts[parts.indexOf("d") + 1] ?? null;
  } catch {
    return null;
  }
};

export const buildGoogleDriveDirectLink = (shareableUrl: string): string | null => {
  const fileId = extractGoogleDriveFileId(shareableUrl);

  if (!fileId) {
    return null;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

export const buildGoogleDriveDirectLinks = (
  shareableUrls: string[],
): string[] => {
  return shareableUrls.reduce<string[]>((links, shareableUrl) => {
    const directLink = buildGoogleDriveDirectLink(shareableUrl);

    if (directLink) {
      links.push(directLink);
    }

    return links;
  }, []);
};
