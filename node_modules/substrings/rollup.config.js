
// Rollup Config

import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import { terser }  from "rollup-plugin-terser"

export default {
  input: "src/substrings.js",
  output: [
    {  
      file: "dist/substrings.js",
      format: "cjs"
    },
    {
      file: "dist/substrings.mjs",
      format: "es"
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    }),
    terser()
  ]
}
