// framebuffer — the screen as a RASTER of RGBA pixels, and the DIFF between two rasters by TILE.
// This is the pixel analogue of arnold's cell Buffer: where arnold holds a width×height grid of
// { ch, style } cells and diffs cell-by-cell, daleske holds a width×height grid of RGBA pixels
// (4 bytes each) and diffs by TILE. A diffed pixel terminal cannot economically re-send one pixel
// (a graphics-protocol image is the unit of transfer), so the framebuffer is partitioned into a
// grid of fixed tiles and the diff reports which TILES changed. The blit then re-encodes only those
// tiles — the raster equivalent of "only the changed cells reach the terminal".
//
// Pure data + pure functions: no node:tty, no I/O, no encoder. A Framebuffer is constructed, drawn
// onto, and diffed. Encoding (kitty/sixel) lives in its own module and consumes a tile's pixels.

import { Framebuffer as RasterFramebuffer } from "@red-cup-engineering/qwzspace/framebuffer";

export const DEFAULT_TILE = 64; // px; a tile is the unit of re-transmission in the diff

// Keep Daleske's public constructor and terminal tile geometry while inheriting
// the same portable RGBA storage and drawing operations that Abrash consumes.
export class Framebuffer extends RasterFramebuffer {
  constructor(width, height, tile = DEFAULT_TILE) {
    super(width, height, tile);
    // tile grid dimensions (ceil so a partial edge tile still counts)
    this.cols = Math.ceil(this.width / this.tile);
    this.rows = Math.ceil(this.height / this.tile);
  }

  // tileRect(col, row) -> { x, y, w, h } — the pixel extent of tile (col,row), clipped to the edge.
  tileRect(col, row) {
    const x = col * this.tile, y = row * this.tile;
    return { x, y, w: Math.min(this.tile, this.width - x), h: Math.min(this.tile, this.height - y) };
  }

  // tilePixels(col, row) -> Uint8ClampedArray — a TIGHTLY PACKED RGBA copy of tile (col,row), of
  // size w*h*4 (the edge tiles are narrower/shorter). This is what an encoder consumes.
  tilePixels(col, row) {
    const { x, y, w, h } = this.tileRect(col, row);
    const out = new Uint8ClampedArray(w * h * 4);
    let o = 0;
    for (let yy = 0; yy < h; yy++) {
      let i = ((y + yy) * this.width + x) * 4;
      for (let xx = 0; xx < w; xx++) {
        out[o++] = this.data[i++]; out[o++] = this.data[i++];
        out[o++] = this.data[i++]; out[o++] = this.data[i++];
      }
    }
    return out;
  }
}

// tilesEqual(a, b, col, row) — do two framebuffers carry identical pixels across one tile? The
// diff's atom (the raster analogue of cellsEqual).
export function tilesEqual(a, b, col, row) {
  const { x, y, w, h } = a.tileRect(col, row);
  for (let yy = 0; yy < h; yy++) {
    let ia = ((y + yy) * a.width + x) * 4;
    let ib = ((y + yy) * b.width + x) * 4;
    for (let xx = 0; xx < w * 4; xx++) {
      if (a.data[ia++] !== b.data[ib++]) return false;
    }
  }
  return true;
}

// diff(prev, next) -> { full, tiles } — the list of changed TILES going from `prev` to `next`. Each
// entry is { col, row } addressing a tile of `next`. If `prev` is null (first paint) or dimensions
// differ, EVERY tile is changed (a full repaint). The blit turns this into the minimal set of
// graphics-protocol image transmissions. The raster analogue of arnold's buffer.diff.
export function diff(prev, next) {
  const all = () => {
    const tiles = [];
    for (let row = 0; row < next.rows; row++) {
      for (let col = 0; col < next.cols; col++) tiles.push({ col, row });
    }
    return tiles;
  };
  if (!prev || prev.width !== next.width || prev.height !== next.height || prev.tile !== next.tile) {
    return { full: true, tiles: all() };
  }
  const tiles = [];
  for (let row = 0; row < next.rows; row++) {
    for (let col = 0; col < next.cols; col++) {
      if (!tilesEqual(prev, next, col, row)) tiles.push({ col, row });
    }
  }
  return { full: false, tiles };
}
