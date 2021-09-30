import { Icon } from "@chakra-ui/icons";

import { ImStack } from "react-icons/im";

import {
  FiArchive,
  FiVideo,
  FiMusic,
  FiFileText,
  FiImage,
} from "react-icons/fi";

function sampleFilesCategories() {
  return [
    {
      categoryId: "600569d181371b1b934687e1",
      name: "Videos",
      icon: <Icon as={FiVideo} w={120} h={120} color={"gray.700"} />,
      detail:
        "Collection of free video files with different formats required for testing purpose during development.",
      path: "/samplefiles/category/600569d181371b1b934687e1",
    },
    {
      categoryId: "600569d181371b1b934687e2",
      name: "Audios",
      icon: <Icon as={FiMusic} w={120} h={120} color={"gray.700"} />,
      detail:
        "Free Audio files in different formats and sizes required for testing purpose during development.",
      path: "/samplefiles/category/600569d181371b1b934687e2",
    },
    {
      categoryId: "600569d181371b1b934687e4",
      name: "Documents",
      icon: <Icon as={FiFileText} w={120} h={120} color={"gray.700"} />,
      detail:
        "Scanned and virus free documents in different formats and sizes available for free download.",
      path: "/samplefiles/category/600569d181371b1b934687e4",
    },
    {
      categoryId: "600569d181371b1b934687e3",
      name: "Images",
      icon: <Icon as={FiImage} w={120} h={120} color={"gray.700"} />,
      detail:
        "Free set of popular image formats in different sizes required for testing during development.",
      path: "/samplefiles/category/600569d181371b1b934687e3",
    },
    {
      categoryId: "600569d181371b1b934687e5",
      name: "Archives",
      icon: <Icon as={FiArchive} w={120} h={120} color={"gray.700"} />,
      detail:
        "Hand picked virus free compressed file formats in different sizes. Download them for free.",
      path: "/samplefiles/category/600569d181371b1b934687e5",
    },
    {
      categoryId: "600569d181371b1b934687e6",
      name: "Others",
      icon: <Icon as={ImStack} w={120} h={120} color={"gray.700"} />,
      detail:
        "A miscellany of text, fonts and other file formats in different sizes requierd for testing.",
      path: "/samplefiles/category/600569d181371b1b934687e6",
    },
  ];
}

export default sampleFilesCategories;
