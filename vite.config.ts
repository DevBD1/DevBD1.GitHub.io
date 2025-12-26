import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // build: {
  //   outDir: 'build', // Optional: match CRA's output if needed for deployment scripts
  // },
  server: {
    port: 3000,
    open: true,
  },
});
