import fs from "node:fs";
import path from "node:path";

const IMAGE_DIR = "projects/detail";
const IMAGE_EXTS = ["png", "jpg", "jpeg", "webp", "svg"];

// Returns "/projects/detail/<base>.<ext>" when such a file exists in public/, otherwise null.
export function findImage(base: string) {
  for (const ext of IMAGE_EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", IMAGE_DIR, `${base}.${ext}`))) {
      return `/${IMAGE_DIR}/${base}.${ext}`;
    }
  }
  return null;
}
