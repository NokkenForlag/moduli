#!/usr/bin/env node
import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const AI_DIR = ".ai/context";
const timestamp = new Date().toISOString().split("T")[0];

// Ensure directories exist
execSync(`mkdir -p ${AI_DIR}`);

// Generate tree
console.log("🌳 Generating project tree...");
execSync(
  `tree -I 'node_modules|.git|dist|.svelte-kit|build' > ${AI_DIR}/tree-${timestamp}.md`,
);

// Get git status
console.log("📊 Collecting git information...");
const gitLog = execSync("git log --oneline -10").toString();
const gitStatus = execSync("git status --porcelain").toString();
const gitDiff = execSync(
  'git diff --name-only HEAD~5 2>/dev/null || echo "No previous commits"',
).toString();

// Read workspace info
console.log("📦 Reading workspace configuration...");
const workspaceConfig = readFileSync("pnpm-workspace.yaml", "utf-8");
const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));

// Find last checkpoint
const checkpointDir = "docs/checkpoints";
let lastCheckpoint = "None";
if (existsSync(checkpointDir)) {
  const checkpoints = execSync(
    `ls -t ${checkpointDir}/*.md 2>/dev/null | head -1`,
  )
    .toString()
    .trim();
  if (checkpoints) {
    lastCheckpoint = checkpoints.split("/").pop().replace(".md", "");
  }
}

// Generate context document
const contextDoc = `# AI Context Snapshot
Generated: ${new Date().toISOString()}

## 🎯 Project Overview
- **Name:** ${packageJson.name}
- **Version:** ${packageJson.version}
- **Last checkpoint:** ${lastCheckpoint}

## 📦 Workspace Structure
\`\`\`yaml
${workspaceConfig}
\`\`\`

## 📊 Recent Git Activity
### Last 10 commits:
\`\`\`
${gitLog}
\`\`\`

### Working directory changes:
\`\`\`
${gitStatus || "Working directory clean"}
\`\`\`

### Files changed in last 5 commits:
\`\`\`
${gitDiff}
\`\`\`

## 🛠️ Installed Dependencies
${Object.entries(packageJson.devDependencies || {})
  .map(([name, version]) => `- ${name}: ${version}`)
  .join("\n")}

## 📋 Available Scripts
${Object.entries(packageJson.scripts || {})
  .map(([name, script]) => `- \`pnpm ${name}\`: ${script}`)
  .join("\n")}
`;

writeFileSync(join(AI_DIR, `context-${timestamp}.md`), contextDoc);
writeFileSync(join(AI_DIR, "latest-context.md"), contextDoc);

console.log(`✅ AI context generated at ${AI_DIR}/context-${timestamp}.md`);
console.log(`📎 Also available at ${AI_DIR}/latest-context.md`);
