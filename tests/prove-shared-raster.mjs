import { test } from "node:test";
import assert from "node:assert/strict";
import { Framebuffer as SharedFramebuffer } from "@red-cup-engineering/qwzspace/framebuffer";
import { Framebuffer, diff } from "../src/framebuffer.mjs";
import { blit, blitFull } from "../src/blit.mjs";

test("terminal framebuffer inherits the installed shared raster and retains its public fields", () => {
  assert.equal(Object.getPrototypeOf(Framebuffer.prototype), SharedFramebuffer.prototype);
  const fb = new Framebuffer(3, 2, 2);
  assert.ok(fb instanceof SharedFramebuffer);
  assert.deepEqual(Object.keys(fb), ["width", "height", "tile", "data", "cols", "rows"]);
  for (const method of ["inBounds", "setPixel", "getPixel", "clear", "fillRect", "blit"]) {
    assert.equal(fb[method], SharedFramebuffer.prototype[method], `${method} has one owner`);
  }
  assert.equal(fb.clear(1, 2, 3, 4).fillRect(-1, 0, 2, 1, 9, 8, 7), fb);
  assert.deepEqual(fb.getPixel(0, 0), [9, 8, 7, 255]);
  assert.deepEqual(fb.getPixel(1, 0), [1, 2, 3, 4]);
});

test("an upstream raster blits into terminal tiles without losing edge pixels or alpha", () => {
  const source = new SharedFramebuffer(2, 2);
  source.setPixel(0, 0, 10, 20, 30, 40).setPixel(0, 1, 50, 60, 70, 80);
  const fb = new Framebuffer(3, 2, 2);
  assert.equal(fb.blit(source, 2, 0), fb);
  assert.deepEqual(fb.tileRect(1, 0), { x: 2, y: 0, w: 1, h: 2 });
  assert.deepEqual([...fb.tilePixels(1, 0)], [10, 20, 30, 40, 50, 60, 70, 80]);
  const before = new Framebuffer(3, 2, 2);
  assert.deepEqual(diff(before, fb), { full: false, tiles: [{ col: 1, row: 0 }] });
  const encoded = blit(before, fb, { encoder: "kitty" });
  assert.equal(encoded.tiles, 1);
  assert.equal(encoded.full, false);
  const payload = encoded.out.match(/\x1b_G[^;]*;([^\x1b]*)\x1b\\/);
  assert.ok(payload, "one Kitty image is emitted for the changed edge tile");
  assert.deepEqual([...Buffer.from(payload[1], "base64")], [...fb.tilePixels(1, 0)]);
  assert.equal(blit(fb, fb, { encoder: "kitty" }).out, "");
});

test("whole-image terminal presentation accepts the portable owner directly", () => {
  const source = new SharedFramebuffer(2, 1);
  source.setPixel(0, 0, 1, 2, 3, 4).setPixel(1, 0, 5, 6, 7, 8);
  const terminal = new Framebuffer(2, 1);
  terminal.blit(source, 0, 0);
  assert.equal(blitFull(source, { encoder: "kitty" }), blitFull(terminal, { encoder: "kitty" }));
  assert.equal(blitFull(source, { encoder: "sixel" }), blitFull(terminal, { encoder: "sixel" }));
});
