import React from "react";
import * as Yup from "yup";
import shareableLinksValidationSchema from "../../src/validations/shareableLinksValidationSchema";
import shareableLinkValidationSchema from "../../src/validations/shareableLinkValidationSchema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { shareableLink } = req.query;

    const validationSchema = shareableLinkValidationSchema;
    await validationSchema
      .validate({ gdriveUrl: shareableLink })
      .then((values) => {
        const fileId = values.gdriveUrl.split("/")[5];
        const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

        res
          .status(200)
          .json({ success: true, data: { directLink: directLink } });
      })
      .catch((error) => {
        res.status(422).json({ success: false, message: error.message });
      });
  } else if (req.method === "POST") {
    const { shareableLinks } = req.body;
    const validationSchema = shareableLinksValidationSchema;
    await validationSchema
      .validate({ gdriveUrls: shareableLinks })
      .then((values) => {
        const urls = values.gdriveUrls;
        const directLinks = [];
        let i;
        for (i = 0; i < urls.length; i++) {
          let url = urls[i];
          if (!url) continue;

          const fileId = url.split("/")[5];
          const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
          directLinks.push(directLink);
        }

        res
          .status(200)
          .json({ success: true, data: { directLinks: directLinks } });
      })
      .catch((error) => {
        res.status(422).json({ success: false, message: error.message });
      });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
