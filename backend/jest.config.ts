export default {
  preset: "ts-jest",

  testEnvironment: "node",

//   moduleNameMapper: {
//     "^(\\.{1,2}/.*)\\.js$": "$1",
//   },

  setupFilesAfterEnv: ["<rootDir>/tests/setup/mongodb.ts"],

  moduleFileExtensions: ["ts", "js"],

  testMatch: ["**/*.test.ts"],
};
