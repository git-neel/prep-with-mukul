import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "functions/dist",
      "public",
      "attached_assets",
      "coverage",
    ],
  },
  ...nextConfig,
];

export default config;
