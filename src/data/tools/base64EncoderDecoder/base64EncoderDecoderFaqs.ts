export type Base64FaqItem = {
  question: string;
  answer: string;
};

export type Base64FaqsData = {
  header: {
    badge: string;
    title: string;
    desc: string;
  };
  faqs: Base64FaqItem[];
};

export const base64FaqsData: Base64FaqsData = {
  header: {
    badge: "FAQs",
    title: "Base64 Questions Answered",
    desc: "Everything you need to know about Base64 encoding and decoding — from the basics to common edge cases.",
  },
  faqs: [
    {
      question: "What is Base64 encoding?",
      answer:
        "Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters (A–Z, a–z, 0–9, +, /). It converts every 3 bytes of binary data into 4 characters, making binary data safe to transmit through text-only channels like email, JSON, or HTML.",
    },
    {
      question: "Why is Base64 encoding used?",
      answer:
        "Base64 is used when you need to embed binary data (images, files, audio) in a format that only supports text. Common use cases include embedding images in HTML/CSS as data URIs, sending file attachments in JSON API payloads, encoding credentials in HTTP Basic Auth headers, and representing JWT token segments.",
    },
    {
      question: "Is Base64 encoding the same as encryption?",
      answer:
        "No. Base64 is encoding, not encryption. It simply converts binary data into a text-safe format — anyone can decode it instantly without a key. Never use Base64 to secure sensitive data. Use proper encryption (AES, RSA) for security.",
    },
    {
      question: "How much does Base64 increase file size?",
      answer:
        "Base64 encoding increases the data size by approximately 33%. Every 3 bytes of input become 4 characters of output. A 100 KB image becomes roughly 133 KB as Base64. This overhead is why Base64 images should generally be kept small (under 10 KB).",
    },
    {
      question: "What characters does Base64 use?",
      answer:
        "Standard Base64 uses 64 characters: uppercase A–Z (26), lowercase a–z (26), digits 0–9 (10), plus (+), and forward slash (/). The equals sign (=) is used for padding. Base64URL replaces + with - and / with _ to make the output safe for URLs.",
    },
    {
      question: "What is the = sign at the end of a Base64 string?",
      answer:
        "The = signs are padding characters. Since Base64 encodes 3 bytes at a time into 4 characters, if the input length is not a multiple of 3, one or two = signs are added to make the output length a multiple of 4. One = means 1 padding byte; == means 2 padding bytes.",
    },
    {
      question: "What is the difference between Base64 and Base64URL?",
      answer:
        "Base64URL is a URL-safe variant of Base64. It replaces + with - and / with _ so the output can be used in URLs and file names without percent-encoding. It also omits the = padding. JWTs, OAuth tokens, and URL query parameters typically use Base64URL.",
    },
    {
      question: "How do I encode an image to Base64 for use in HTML?",
      answer:
        "Use the Image tab in this tool. Upload your image, then copy the auto-generated HTML snippet: <img src=\"data:image/png;base64,YOUR_ENCODED_STRING\" alt=\"description\" />. Replace image/png with the correct MIME type for your image (image/jpeg, image/gif, etc.).",
    },
    {
      question: "How do I use a Base64 image in CSS?",
      answer:
        "After encoding your image, use the CSS snippet from the Image tab: background-image: url('data:image/png;base64,YOUR_ENCODED_STRING'). This embeds the image directly in your stylesheet without an external HTTP request. Best for small icons and sprites under 10 KB.",
    },
    {
      question: "Can I use Base64 images in email templates?",
      answer:
        "Yes, but with caveats. Most email clients support Base64 data URIs, but some (notably Outlook) may block them. A safer approach for email is to use Content-ID (CID) embedding or hosted image URLs. Base64 also increases email payload size significantly.",
    },
    {
      question: "What is a data URI?",
      answer:
        "A data URI is a URL that embeds file content directly instead of linking to an external file. The format is data:[mediatype][;base64],[data]. For example, data:image/png;base64,iVBORw0K... embeds a PNG image inline. Data URIs are commonly used in HTML, CSS, and JavaScript.",
    },
    {
      question: "How do I decode a JWT token using Base64?",
      answer:
        "A JWT has three parts separated by dots: header.payload.signature. The header and payload are Base64URL encoded. To decode: take the second segment (payload), enable URL-safe mode in this tool, paste the segment, and click Decode. You will see the JSON claims object.",
    },
    {
      question: "How do I decode HTTP Basic Auth credentials from Base64?",
      answer:
        "Basic Auth encodes credentials as Base64(username:password). To decode: copy the value after 'Basic ' from the Authorization header, paste it into the Text tab, select Decode. The output will be your username and password separated by a colon.",
    },
    {
      question: "Why does Base64 decoding give 'invalid padding' errors?",
      answer:
        "Base64 strings must have a length that is a multiple of 4, padded with = signs. If the string was truncated or the padding was stripped (common in URLs), decoding fails. Add = or == at the end until the length is divisible by 4. The 'Fix Padding' button in this tool does this automatically.",
    },
    {
      question: "Why does my Base64 string contain illegal characters?",
      answer:
        "Standard Base64 only allows A–Z, a–z, 0–9, +, /, and =. Common culprits for illegal characters include: spaces or line breaks (copy-paste artifacts), smart/curly quotes from word processors, URL-encoded characters like %3D instead of =, and Base64URL strings with - and _ (use URL-safe mode for those).",
    },
    {
      question: "My Base64 string has _ and - but won't decode — why?",
      answer:
        "Strings with - and _ are Base64URL encoded, not standard Base64. Standard decoders reject these characters. Enable the 'URL-safe' toggle in this tool before decoding. JWTs and most OAuth tokens use Base64URL encoding.",
    },
    {
      question: "Why does decoded Base64 show garbled text?",
      answer:
        "This usually means the original content was encoded in a different character set (like ISO-8859-1 or Windows-1252) but you are decoding as UTF-8. Try the ISO-8859-1 charset option in the tool. Also verify the content was actually text — decoding a binary file as text always produces garbled output.",
    },
    {
      question: "Does Base64 work with Unicode / emoji?",
      answer:
        "Yes, but you must encode the text as UTF-8 bytes first. The browser's built-in btoa() function only handles ASCII. This tool handles Unicode correctly using the TextEncoder API. In JavaScript, use Buffer.from(text, 'utf8').toString('base64') in Node.js or the TextEncoder approach in the browser.",
    },
    {
      question: "Should I use Base64 for images on my website?",
      answer:
        "Only for very small images (under 5–10 KB). Base64 increases file size by 33%, cannot be cached separately by the browser, and bloats your HTML or CSS file. For anything larger, use standard image files with proper caching headers. Base64 is best suited for tiny icons, spacers, and favicons.",
    },
    {
      question: "Can I decode Base64 that has spaces or line breaks in it?",
      answer:
        "Yes. This tool strips whitespace (spaces, tabs, newlines) before decoding, which handles formatted Base64 that was split across lines (common in PEM certificates and MIME email payloads). If you are using a different tool or library, strip whitespace manually first with .replace(/\\s/g, '') in JavaScript.",
    },
  ],
};
