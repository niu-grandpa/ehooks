import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import clear from "rollup-plugin-clear";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import sourceMaps from "rollup-plugin-sourcemaps";
import pkg from "./package.json";

const commonPlugins = [
  nodeResolve(),
  typescript(),
  clear({
    targets: ["dist"],
  }),
  sourceMaps(),
  json(),
  babel({
    exclude: ["node_modules/**", "../../node_modules/**"],
    plugins: ["@babel/plugin-external-helpers"],
  }),
  commonjs({
    ignoreGlobal: true,
  }),
  replace({
    preventAssignment: true,
    __VERSION__: JSON.stringify(pkg.version),
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
];

const prodPlugins = [terser()];

const globals = { react: "React", "react-dom": "ReactDOM" };

const config = {
  input: "./packages/index.ts",
  // \0 is rollup convention for generated in memory modules
  external: Object.keys(globals),
  plugins: commonPlugins,
  output: [
    {
      file: "dist/umd/ehooks.umd.js",
      format: "umd",
      globals,
      name: "ehooks",
      plugins: prodPlugins,
    },
  ],
};

export default config;
