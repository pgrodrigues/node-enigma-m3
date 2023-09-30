import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  collectCoverage: true,
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true
};

export default jestConfig;
