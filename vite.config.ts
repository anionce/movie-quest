import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	envDir: process.env.VITEST ? false : undefined,
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "/src/assets/styles/variables.scss" as *;`,
			},
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		execArgv: ['--no-experimental-webstorage'],
	},
});
