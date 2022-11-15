module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@config": "./src/config",
          "@commands": "./src/commands",
          "@services": "./src/services",
          "@components": "./src/components",
          "@models": "./src/models",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
