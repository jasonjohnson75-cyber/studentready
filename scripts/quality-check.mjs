import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

const requirements = [
  ["guidance disclaimer", "Guidance only"],
  ["whole-school support", 'id: "systems"'],
  ["evidence review", 'id: "standards"'],
  ["student level selector", "Student level"],
  ["role-specific guidance", "Your first responsibility"],
  ["resource evidence labels", "item.evidence"],
  ["resource review dates", "item.reviewed"],
  ["skip navigation", "Skip to main content"],
  ["live search status", 'aria-live="polite"'],
  ["safety escalation", "Call 911"],
  ["crisis support", "Call or text 988"],
];

const failures = requirements.filter(([, token]) => !page.includes(token));
if (!css.includes(":focus-visible") || !css.includes("prefers-reduced-motion")) {
  failures.push(["keyboard and reduced-motion styles", "required accessibility CSS"]);
}

const reviewedCount = (page.match(/reviewed: "Aug\. 14, 2026"/g) || []).length;
if (reviewedCount !== 12) failures.push(["resource review metadata", `expected 12, found ${reviewedCount}`]);

const urls = [...page.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (urls.length !== 12 || new Set(urls).size !== urls.length) {
  failures.push(["resource URLs", "expected 12 unique HTTPS resource URLs"]);
}

if (failures.length) {
  console.error("StudentReady quality checks failed:");
  for (const [name, detail] of failures) console.error(`- ${name}: ${detail}`);
  process.exit(1);
}

console.log(`StudentReady quality checks passed: ${requirements.length + 3} checks, ${urls.length} reviewed resources.`);
