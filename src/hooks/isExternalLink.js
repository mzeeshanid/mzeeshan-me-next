import React from "react";

function isExternalLink(path) {
  const isExternal = (path && path.length > 2 && path.slice(0, 2)) === "//";
  return isExternal;
}

export default isExternalLink;
