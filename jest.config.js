export default {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  collectCoverageFrom: ["src/**/*.js", "routes/**/*.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/test/routes/**/*.js"],
  setupFiles: ["<rootDir>/test/setup.js"],
  testTimeout: 10000
};
