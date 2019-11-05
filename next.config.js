const fs = require("fs");

module.exports = {
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: "frontmatter-markdown-loader",
      }
    );
    return config;
  },
  exportPathMap: () => {
    const paths = {
      "/": { page: "/" },
      "/blog": { page: "/blog" },
    };
    fs.readdirSync("./content/md/blog").forEach(file => {
      const post = removeFileExtension(file);
      paths[ `/blog/${post}` ] = {
        page: `/blog/[post]`,
        query: { post },
      };
    });

    return paths;
  },
};

function removeFileExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}
