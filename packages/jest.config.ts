// jest.config.ts
import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
const { compilerOptions } = require("./tsconfig");
// Or async function

export default (): Config.InitialOptions => {
  return {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/__tests__/**/*.(spec|test).(ts|tsx)"],
    verbose: true,
    // transform: {
    //   "^.+\\.[jt]sx?$": "esbuild-jest",
    // },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    rootDir: "./",
    coverageProvider: "v8",
    modulePaths: ["<rootDir>"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };
};
