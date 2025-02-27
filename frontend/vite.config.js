import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

const BASE_PATH = process.env.VITE_BASE_PATH || "/codathon/";

export default defineConfig({
	plugins: [react()],
	base: BASE_PATH,
});
