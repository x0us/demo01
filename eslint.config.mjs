// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  solid: true,
  unocss: true,
  ignores: [
    '**/fixtures', // Existing ignored files
    '**/d.js', // Ignore all files named d.js
  ],
})
