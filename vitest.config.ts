import { defineConfig } from "vite";

export default defineConfig({

    resolve: {
        tsconfigPaths: true,

    },

    test: {
        exclude: [
            'node_modules',
            'dist',
            'build',
            'coverage',
            'e2e/**',
            "**/*.e2e.spec.ts",        // 👈 ignore this folder
            'src/legacy/**', // 👈 example
        ],
    }


})