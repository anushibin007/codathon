import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const BASE_PATH = env.VITE_BASE_PATH || "/codathon/";

	return {
		plugins: [react()],
		base: BASE_PATH,
	};
});
