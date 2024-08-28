const path = require("node:path");
const fs = require("node:fs");
const Walker = require("./utils/walker");

// add attribute 'referrerpolicy="no-referrer"' to img tag, fix origin site blocking img
function main() {
  // copy CNAME
  // fs.copyFileSync(
  //     path.resolve(__dirname, "../CNAME"),
  //     path.resolve(__dirname, "../public/CNAME")
  // );

  // place CNAME into source dir, will be copied by hexo

  const walker = new Walker({
    root: path.resolve(__dirname, "../public"),
    check(filename) {
      return /\.html/.test(filename);
    },
    callback(absPath) {
      // console.log("🚀 ~ callback ~ absPath:", absPath);
      addAttrAboutReferrer(absPath);
    },
  });

  walker.start();
}

function addAttrAboutReferrer(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const newContent = content.replace(
    /<img\s+(?!referrerpolicy)/gim,
    '$& referrerpolicy="no-referrer" '
  );

  fs.writeFileSync(filePath, newContent, "utf8");
}

main();
