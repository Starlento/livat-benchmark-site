"use strict";
const search = document.getElementById("search");
const list = document.getElementById("case-list");
const count = document.getElementById("count");
let catalogue = [];
function render() {
  const query = search.value.trim().toLowerCase();
  const cases = catalogue.filter(c => (c.case_id + " " + c.user_input).toLowerCase().includes(query));
  count.textContent = `${cases.length} / ${catalogue.length} tasks`;
  list.replaceChildren();
  for (const c of cases) {
    const card = document.createElement("article"); card.className = "case";
    const id = document.createElement("small"); id.textContent = c.case_id;
    const prompt = document.createElement("p"); prompt.lang = "zh-CN"; prompt.title = "User prompt (original Chinese)"; prompt.textContent = c.user_input;
    card.append(id, prompt); list.append(card);
  }
  if (!cases.length) { const p = document.createElement("p"); p.className = "empty"; p.textContent = "No matching tasks. Try another keyword."; list.append(p); }
}
search.addEventListener("input", render);
fetch("public-cases.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(data => {
  if (!Array.isArray(data) || !data.every(c => Object.keys(c).length === 2 && typeof c.case_id === "string" && typeof c.user_input === "string")) throw new Error("Invalid catalogue");
  catalogue = data; render();
}).catch(() => { count.textContent = "Failed to load the catalogue"; const p = document.createElement("p"); p.textContent = "Please refresh the page to try again, or download the task JSON from the footer."; list.replaceChildren(p); });
document.getElementById("copy").addEventListener("click", async event => {
  const button = event.currentTarget;
  try { await navigator.clipboard.writeText(document.getElementById("install-code").textContent); button.textContent = "Copied"; }
  catch { button.textContent = "Select the text to copy"; }
  setTimeout(() => button.textContent = "Copy", 2500);
});
