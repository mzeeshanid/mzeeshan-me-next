import { keyframes } from "@emotion/react";

export const slide = keyframes`
  from {
    transform: translateX(var(--from));
  }
  to {
    transform: translateX(var(--to));
  }
`;

