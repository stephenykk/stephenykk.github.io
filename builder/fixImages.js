const path = require("node:path");
const fs = require("node:fs");
const {tag, Walker} = require("./utils");

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
      fixImgSrc(absPath);
    },
  });

  walker.start();
}

function addAttrAboutReferrer(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const newContent = content.replace(
    /(<img)\s+(referrerpolicy="no-referrer"\s+)*/gim,
    '$1 referrerpolicy="no-referrer" '
  );

  fs.writeFileSync(filePath, newContent, "utf8");
}

function fixImgSrc(filePath) {
  /**
   * <img  referrerpolicy="no-referrer" class="lazy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=" data-src="https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9b916b04070c43e28ab329d1670e6ceb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCPdQ==:q75.awebp?rk3s=f64ab15b&x-expires=1731053780&x-signature=lejbjUndr8WYyB5dLlXNwYf5cnY=" alt="image-20240711145306580">
   *
   * ==>
   *
   * <img  referrerpolicy="no-referrer" class="lazy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=" data-src="https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9b916b04070c43e28ab329d1670e6ceb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCPdQ==:q75.awebp?rk3s=f64ab15b&x-expires=1731053780&x-signature=lejbjUndr8WYyB5dLlXNwYf5cnY%3D" alt="image-20240711145306580">
   * 
   * data-src 结尾的= 替换成 %3D
   */
  const content = fs.readFileSync(filePath, "utf8");
  const imgRe = tag.getTagReg("img")
  const imgTags = content.match(imgRe)
  if (!imgTags) return
  
  const needFixTags = imgTags.map(startTag => {
    const tagData = tag.parseTag(startTag)
    return tagData
  }).filter(tagData => {
    return tagData.attrs['data-src']?.endsWith('=')
  })

  
  if (!needFixTags.length) return
  console.log("\n\n", "NEED FIX SRC ======>", filePath, '\n', needFixTags.map(tag => tag.attrs['data-src']).join('\n'));

  const newContent = needFixTags.reduce((html, tagData) => {
    return html.replace(tagData.attrs['data-src'], tagData.attrs['data-src'].replace(/=$/, '%3D'))
  }, content)

  fs.writeFileSync(filePath, newContent, "utf8");
}

main();
