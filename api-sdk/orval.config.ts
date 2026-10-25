import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./api.json",
    output: {
      mode: "tags-operations",
      target: "./src/api/api.ts",
      schemas: "./src/api/models",
      client: "fetch",
      baseUrl: "http://localhost:8000",
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
    },
  },

  apiZod: {
    input: "./api.json",
    output: {
      mode: "tags",
      target: "./src/apiZod",
      schemas: "./src/apiZod/model",
      client: "zod",
    },
  },
});
