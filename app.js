"use strict";
const search = document.getElementById("search");
const list = document.getElementById("case-list");
const count = document.getElementById("count");
let catalogue = [];
function render() {
  const query = search.value.trim().toLowerCase();
  const cases = catalogue.filter(c => (c.case_id + " " + c.user_input).toLowerCase().includes(query));
  count.textContent = `${cases.length} / ${catalogue.length} 个任务`;
  list.replaceChildren();
  for (const c of cases) {
    const card = document.createElement("article"); card.className = "case";
    const id = document.createElement("small"); id.textContent = c.case_id;
    const prompt = document.createElement("p"); prompt.textContent = c.user_input;
    card.append(id, prompt); list.append(card);
  }
  if (!cases.length) { const p = document.createElement("p"); p.className = "empty"; p.textContent = "没有匹配的任务，请尝试其他关键词。"; list.append(p); }
}
search.addEventListener("input", render);
fetch("public-cases.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(data => {
  if (!Array.isArray(data) || !data.every(c => Object.keys(c).length === 2 && typeof c.case_id === "string" && typeof c.user_input === "string")) throw new Error("Invalid catalogue");
  catalogue = data; render();
}).catch(() => { count.textContent = "目录加载失败"; const p = document.createElement("p"); p.textContent = "请刷新页面重试，或通过页脚下载任务 JSON。"; list.replaceChildren(p); });
document.getElementById("copy").addEventListener("click", async event => {
  const button = event.currentTarget;
  try { await navigator.clipboard.writeText(document.getElementById("install-code").textContent); button.textContent = "已复制"; }
  catch { button.textContent = "请选中复制"; }
  setTimeout(() => button.textContent = "复制", 2500);
});
