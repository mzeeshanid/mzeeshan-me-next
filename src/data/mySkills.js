import React from "react";

function mySkills() {
  const skills = [
    {
      heading: "Xcode",
      image: "/assets/xcode_app_icon.png",
      background: "light-2",
      alt: "xcode app icon image",
      data: [
        "Swift & Objective-C",
        "Object Oriented Programming",
        "Protocol Oriented Programming",
        "UIKit, CoreLocation, CoreData",
        "CoreStore, Alamofire, ObjectMapper",
        "Git, Memory management, debugging",
        "AppStore and Enterprise distribution",
      ],
    },
    {
      heading: "React",
      image: "/assets/react_app_icon.png",
      alt: "react app icon image",
      data: [
        "React JS & React Native",
        "React Native CLI & Expo",
        "Functional Programming",
        "Functional components & React Hooks",
        "Formik, Joi, APISauce, Axios",
        "Bootstrap, Grommet, ChakraUI",
        "Visual Studio Code, Postman, JSON, Git",
      ],
    },
  ];

  return skills;
}

export default mySkills;
