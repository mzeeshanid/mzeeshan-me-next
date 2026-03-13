import { defaultSchema } from "rehype-sanitize";

export const markdownSanitizeSchema = {
    ...defaultSchema,
    
    tagNames: [
        ...(defaultSchema.tagNames || []),
        "iframe",
        "gist"
    ],
    
    attributes: {
        ...defaultSchema.attributes,
        gist: ["id"],
        iframe: [
            "src",
            "width",
            "height",
            "allow",
            "allowfullscreen",
            "frameborder",
            "title",
        ],
    },
};
