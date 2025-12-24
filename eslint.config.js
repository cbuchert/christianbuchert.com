// eslint.config.mjs
import antfu from "@antfu/eslint-config"

export default antfu({
  astro: true,
  stylistic: {
    indent: 2,
    quotes: "double",
  },

  formatters: {
    css: true, // Format CSS (including <style> blocks in Astro)
    markdown: true, // or 'prettier' / 'dprint'
  },
  perfectionist: true,
}, {
  rules: {
    "style/indent": ["error", 2, { SwitchCase: 1 }], // Let indent handle it
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: [
        "README.md",
      ],
    }],
  },
})
