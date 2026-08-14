import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const urls = [...new Set([...page.matchAll(/(?:url: |href=)"(https:\/\/[^\"]+)"/g)].map((match) => match[1]))];
const failures = [];

for (const url of urls) {
  try {
    const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "StudentReady resource review" } });
    if (response.status === 404 || response.status >= 500) failures.push(`${response.status} ${url}`);
    else console.log(`${response.status} ${url}`);
  } catch (error) {
    failures.push(`${error.name}: ${url}`);
  }
}

if (failures.length) {
  console.error("Resource links requiring review:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Link check passed for ${urls.length} official resources.`);
