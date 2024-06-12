// In Node.js, open a file passed as the first argument.

const fs = require("fs")
const path = require("path")

const file = process.argv[ 2 ]

if (!file) {
  console.error('No file specified.');
  process.exit(1);
}

// Build the file path from the current directory.
const filePath = path.join(process.cwd(), file)

// Read the file.
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err)
  }

//   Omit the first and last lines.
  const lines = data.toString().split("\n").slice(1, -2)

  const output = []

  for (let i = 0; i < lines.length; i += 3) {
    const group = lines.slice(i, i + 3).join("\n")

    output.push(group)
  }

  const groupedContents = output.join("</g>\n<g>")

  console.log(`<g>${groupedContents}</g>`)
})
