import { defineConfig } from "orval";

export default defineConfig({
	api: {
		input: "./api.json",
		output: {
			mode: "tags-operations",
			target: "./src/api/api.ts",
			schemas: "./src/api/models",
			client: "fetch",
			baseUrl: "/api/",
			// baseUrl: {
			//   runtime: "process.env.API_BASE_URL",
			// },
			//   mock: true,
		},
	},
});
