// jest.config.ts
import type { Config } from "@jest/types";
// Or async function

export default (): Config.InitialOptions => {
  return {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/__tests__/**/*.(spec|test).(ts|tsx)"],
    testPathIgnorePatterns: ["node_modules/"],
    verbose: true,
    transform: {
      "^.+.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
      // Mocks out all these file formats when tests are run
      ".(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "identity-obj-proxy",
      ".(css|less|scss|sass)$": "identity-obj-proxy",
    },
    rootDir: "./",
    coverageProvider: "v8",
    modulePaths: ["<rootDir>"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };
};
