export default {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  collectCoverageFrom: ["src/**/*.js", "routes/**/*.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/test/**/*.js"]
};
