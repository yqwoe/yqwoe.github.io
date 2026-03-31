// dns-prefetch.js
const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");
const { glob, Glob } = require("glob");
const urlRegex = require("url-regex");

// 获取外部链接的正则表达式
var urlPattern = /(https?:\/\/[^/]*)/i;
let urls = new Set();

// 遍历dist目录中的所有HTML、JS、CSS文件
async function searchDomin() {
 glob(
    "public/**/*.{html,css,js}",
    {},
    (err, files) => {
      for (const file of files) {
        try {
          const source = fs.readFileSync(file, "utf-8");

          const matches = source.match(urlRegex({ strict: true }));
        //   console.log(matches)
          if (matches) {
            matches.forEach((url) => {
              const match = url.match(urlPattern);
            //   console.log(match[1])
              if (match && match[1]) {
                urls.add(match[1]);
              }
            });
          }
        } catch (e) {
        //   console.log(file);
        }
      }

      const links = [...urls]
    .map((url) => `<link rel="dns-prefetch" href="${url}" />`)
    .join("\n");
  console.log(links);
    }
  );
  // const files = await glob('public/**/*.{html,css,js}')
  // console.log(files)

  // for (const file of files) {
  //     const source = fs.readFileSync(file, 'utf-8')
  //     const matches = source.match(urlRegex({ strict: true }))
  //     if (matches) {
  //         matches.forEach((url) => {
  //             const match = url.match(urlPattern)
  //             if (match && match[1]) {
  //                 urls.add(match[1])
  //             }
  //         })
  //     }
  // }
}

// 在index.html文件<head>标签中插入link标签
function insertLinks() {
    console.log(urls)
  const links = [...urls]
    .map((url) => `<link rel="dns-prefetch" href="${url}" />`)
    .join("\n");
  console.log(links);
}

async function main() {
  await searchDomin();
  await insertLinks();
}

main();
