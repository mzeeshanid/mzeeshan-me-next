export type Base64CodeExample = {
  language: string;
  label: string;
  encode: string;
  decode: string;
};

export type Base64CodeExamplesData = {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  examples: Base64CodeExample[];
};

export const base64CodeExamplesData: Base64CodeExamplesData = {
  header: {
    badge: "Code Examples",
    title: "Base64 in Your Language",
    description:
      "Copy-paste snippets for the most common languages and tools. All examples encode and decode a simple string.",
  },
  examples: [
    {
      language: "javascript",
      label: "JavaScript",
      encode: `// Browser — ASCII only (use TextEncoder for Unicode)
const encoded = btoa("Hello, World!");
console.log(encoded); // SGVsbG8sIFdvcmxkIQ==

// Browser — Unicode safe
const bytes = new TextEncoder().encode("Hello 🌍");
const bin = String.fromCharCode(...bytes);
const encodedUnicode = btoa(bin);

// Node.js
const encodedNode = Buffer.from("Hello, World!").toString("base64");`,
      decode: `// Browser — ASCII only
const decoded = atob("SGVsbG8sIFdvcmxkIQ==");
console.log(decoded); // Hello, World!

// Browser — Unicode safe
const binary = atob("SGVsbG8sIFdvcmxkIQ==");
const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));
const decodedUnicode = new TextDecoder().decode(bytes);

// Node.js
const decodedNode = Buffer.from("SGVsbG8sIFdvcmxkIQ==", "base64").toString();`,
    },
    {
      language: "python",
      label: "Python",
      encode: `import base64

text = "Hello, World!"

# Encode string to Base64
encoded = base64.b64encode(text.encode("utf-8")).decode("utf-8")
print(encoded)  # SGVsbG8sIFdvcmxkIQ==

# URL-safe Base64 (for JWTs, URLs)
encoded_url = base64.urlsafe_b64encode(text.encode()).decode()`,
      decode: `import base64

encoded = "SGVsbG8sIFdvcmxkIQ=="

# Decode Base64 string
decoded = base64.b64decode(encoded).decode("utf-8")
print(decoded)  # Hello, World!

# URL-safe Base64 decode
decoded_url = base64.urlsafe_b64decode(encoded + "==").decode()`,
    },
    {
      language: "java",
      label: "Java",
      encode: `import java.util.Base64;

String text = "Hello, World!";

// Standard Base64
String encoded = Base64.getEncoder()
    .encodeToString(text.getBytes("UTF-8"));
System.out.println(encoded); // SGVsbG8sIFdvcmxkIQ==

// URL-safe Base64 (no padding)
String encodedUrl = Base64.getUrlEncoder()
    .withoutPadding()
    .encodeToString(text.getBytes("UTF-8"));`,
      decode: `import java.util.Base64;

String encoded = "SGVsbG8sIFdvcmxkIQ==";

// Standard Base64
byte[] decodedBytes = Base64.getDecoder().decode(encoded);
String decoded = new String(decodedBytes, "UTF-8");
System.out.println(decoded); // Hello, World!

// URL-safe Base64
byte[] urlDecoded = Base64.getUrlDecoder().decode(encoded);
String decodedUrl = new String(urlDecoded, "UTF-8");`,
    },
    {
      language: "bash",
      label: "curl / bash",
      encode: `# Encode a string (no newline)
echo -n "Hello, World!" | base64
# SGVsbG8sIFdvcmxkIQ==

# HTTP Basic Auth header
echo -n "username:password" | base64
# dXNlcm5hbWU6cGFzc3dvcmQ=

# Use in curl request
curl -H "Authorization: Basic $(echo -n 'user:pass' | base64)" \\
  https://api.example.com/resource`,
      decode: `# Decode a Base64 string
echo "SGVsbG8sIFdvcmxkIQ==" | base64 --decode
# Hello, World!

# Decode a JWT payload (second segment)
JWT="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIn0.signature"
PAYLOAD=$(echo $JWT | cut -d. -f2)
echo "$PAYLOAD==" | base64 --decode`,
    },
    {
      language: "php",
      label: "PHP",
      encode: `<?php
$text = "Hello, World!";

// Encode to Base64
$encoded = base64_encode($text);
echo $encoded; // SGVsbG8sIFdvcmxkIQ==

// URL-safe Base64 (replace +, /, strip =)
$encodedUrl = rtrim(strtr($encoded, '+/', '-_'), '=');`,
      decode: `<?php
$encoded = "SGVsbG8sIFdvcmxkIQ==";

// Decode from Base64
$decoded = base64_decode($encoded);
echo $decoded; // Hello, World!

// Strict mode (returns false on invalid input)
$decoded = base64_decode($encoded, true);
if ($decoded === false) {
    echo "Invalid Base64 string";
}`,
    },
    {
      language: "swift",
      label: "Swift",
      encode: `import Foundation

let text = "Hello, World!"

// Encode string to Base64
if let data = text.data(using: .utf8) {
    let encoded = data.base64EncodedString()
    print(encoded) // SGVsbG8sIFdvcmxkIQ==

    // URL-safe Base64 using allowed character mapping
    let encodedUrl = String(encoded.unicodeScalars.compactMap {
        switch $0 {
        case "+": return Unicode.Scalar("-")
        case "/": return Unicode.Scalar("_")
        case "=": return nil  // strip padding
        default:  return $0
        }
    })
}`,
      decode: `import Foundation

let encoded = "SGVsbG8sIFdvcmxkIQ=="

// Decode from Base64
if let data = Data(base64Encoded: encoded),
   let decoded = String(data: data, encoding: .utf8) {
    print(decoded) // Hello, World!
}

// Handle missing padding (common with Base64URL)
func fixBase64Padding(_ s: String) -> String {
    let r = s.count % 4
    return r == 0 ? s : s + String(repeating: "=", count: 4 - r)
}`,
    },
    {
      language: "kotlin",
      label: "Kotlin",
      encode: `import java.util.Base64

val text = "Hello, World!"

// Standard Base64
val encoded = Base64.getEncoder()
    .encodeToString(text.toByteArray(Charsets.UTF_8))
println(encoded) // SGVsbG8sIFdvcmxkIQ==

// URL-safe Base64 (no padding)
val encodedUrl = Base64.getUrlEncoder()
    .withoutPadding()
    .encodeToString(text.toByteArray(Charsets.UTF_8))`,
      decode: `import java.util.Base64

val encoded = "SGVsbG8sIFdvcmxkIQ=="

// Standard Base64
val decodedBytes = Base64.getDecoder().decode(encoded)
val decoded = String(decodedBytes, Charsets.UTF_8)
println(decoded) // Hello, World!

// URL-safe Base64
val urlDecoded = Base64.getUrlDecoder().decode(encoded)
val decodedUrl = String(urlDecoded, Charsets.UTF_8)`,
    },
  ],
};
