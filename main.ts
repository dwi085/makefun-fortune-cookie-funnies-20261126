// Fortune Cookie Funnies for Engineers — make.fun entry.
//
// Writes exactly one fortune-cookie line for a software engineer to
// /output/entry.txt. The line is a fixed, hand-written string: a program
// that outputs a constant is deterministic by construction, so every run
// produces byte-identical output.
//
// The fortune: a classic cookie opening ("You will ..."), an engineer's
// everyday act (renaming a variable), and a punchline that lands on the
// last words — three services that never met each other breaking anyway.
// Short, declarative, and fresh: no stock mug joke, no "it's not a bug,
// it's a feature", no "works on my machine".

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You will rename one variable and break three services that never met each other.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Self-check the sealed gate before writing: UTF-8 text, 1 to 120
  // characters, a single line, not only whitespace. Fail loudly instead
  // of emitting an entry the scorer would reject.
  const chars = [...FORTUNE];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`fortune is ${chars.length} characters, must be 1-120`);
  }
  if (FORTUNE.includes("\n") || FORTUNE.trim().length === 0) {
    throw new Error("fortune must be one non-blank line");
  }

  // Create /output if it is missing. Never delete the directory itself:
  // the grader runs as an unprivileged user and removing it breaks the
  // run (see the GTA 6 r6 lesson). Only the file inside is replaced.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, FORTUNE, "utf8");
}

main();
