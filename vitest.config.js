import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        fileParallelism: false, // Run test files sequentially
        isolate: true, // Isolate each test file
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: [
                "node_modules/",
                "test/",
                "tests/",
                "routes/",
                "*.config.js",
                "seed.js",
                "bruno/",
                "hospitalData.js",
                "js-practise.js",
                "main.js",
            ],
            thresholds: {
                lines: 75,
                functions: 65,
                branches: 70,
                statements: 75,
            },
        },
        setupFiles: ["./tests/setup.js"],
    },
});
