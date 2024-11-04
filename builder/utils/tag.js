// <div class="l_body s:aa content tech" id="start" layout="post" disabled>
// tagAttrs: { class: "l_body s:aa content tech", id: "start", layout: "post", disabled: true }
function parseTag(startTagStr) {
  const text = startTagStr.replace(/^<|>$/g, '');
  const tagName = text.match(/^[a-z]+/)[0];
  const attrs = text.replace(/^[a-z]+/, '').match(/\s*([a-z\-]+)(="[^"]*"|\s+|$)/g);
  const tagAttrs = {};
  if (attrs) {
    attrs.forEach(attr => {
      const [key, value = true] = attr.split(/(?<=^\s*[a-z\-]+)=/);
      tagAttrs[key.trim()] = value === true ? true : value.replace(/"/g, '');
    });
  }
  return { name: tagName, attrs: tagAttrs };
}

function getTagReg(tag, isGlobal = true) {
  return new RegExp(`<${tag}[^>]*>`, isGlobal ? 'img' : 'im');
}

module.exports = {
  parseTag,
  getTagReg
}