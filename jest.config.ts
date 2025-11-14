import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true
};

export default config;
