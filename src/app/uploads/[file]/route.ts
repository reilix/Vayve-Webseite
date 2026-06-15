import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { UPLOADS_DIR } from "@/lib/paths";
import { CONTENT_TYPE_BY_EXT } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  // Path-Traversal-Guard: nur Basename, aufgelöst innerhalb des Upload-Dirs.
  const name = path.basename(file);
  const baseDir = path.resolve(UPLOADS_DIR);
  const resolved = path.resolve(baseDir, name);
  if (resolved !== path.join(baseDir, name) || !resolved.startsWith(baseDir + path.sep)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const contentType = CONTENT_TYPE_BY_EXT[ext];
  if (!contentType) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(resolved);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
