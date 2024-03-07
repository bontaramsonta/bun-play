import { $ } from "bun";

await $`bun run index.ts | jq '.'`;
