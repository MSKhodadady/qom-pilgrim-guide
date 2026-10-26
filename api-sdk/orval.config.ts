import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./api.json",
    output: {
      mode: "tags-operations",
      target: "./src/api/api.ts",
      schemas: "./src/api/models",
      client: "fetch",
      baseUrl: {
        runtime: "process.env.API_BASE_URL",
      },
      //   mock: true,
    },
  },
  apiQuery: {
    input: "./api.json",
    output: {
      mode: "tags-operations",
      target: "./src/apiQuery/apiQuery.ts",
      schemas: "./src/apiQuery/model",
      client: "react-query",
      baseUrl: {
        runtime: "process.env.API_BASE_URL",
      },
    },
  },

  apiZod: {
    input: "./api.json",
    output: {
      mode: "tags",
      target: "./src/apiZod",
      schemas: "./src/apiZod/model",
      client: "zod",
      baseUrl: {
        runtime: "process.env.API_BASE_URL",
      },
    },
  },
});
