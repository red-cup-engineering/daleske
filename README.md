# @red-cup-engineering/daleske

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

A raster terminal-interface engine. Daleske owns terminal tile geometry, changed-tile diffs, Kitty and
Sixel encoders, terminal capability classification, blits, and `PixelScreen`. Its lifecycle and
input are supplied by `@red-cup-engineering/terminal-user-interface-engine`.

It has no domain model. Systems supply framebuffers for Daleske to encode and display. The EAVT
settled-section raster projection and its interactive demonstration live in
`@red-cup-engineering/eavt-terminal-projectors/raster`.

## Shared raster owner

From 0.3.0, Daleske's `Framebuffer` extends the portable RGBA class from
`@red-cup-engineering/qwzspace/framebuffer` at 0.10.0. Abrash re-exports that
same class for browser rendering. RGBA allocation, byte conversion, pixel
bounds, rectangle clipping and blitting therefore have one implementation.
Daleske adds `cols`, `rows`, `tileRect` and `tilePixels` and retains its
`DEFAULT_TILE`, `tilesEqual` and `diff` exports. Constructor arguments,
enumerable fields and chainable drawing results remain compatible.

Importing the raster class does not start a terminal or load browser globals.
The upstream raster module has no imports; normal package installation still
receives QwzSpace's declared dependency closure. Node 24.2.0 or newer is required
to match the declared minimum of the resolved dependency closure.

## Public modules

| subpath | capability |
| --- | --- |
| `@red-cup-engineering/daleske/framebuffer` | RGBA framebuffer and tile diff |
| `@red-cup-engineering/daleske/kitty` | Kitty graphics encoding |
| `@red-cup-engineering/daleske/sixel` | Sixel encoding |
| `@red-cup-engineering/daleske/capability` | raster capability classification |
| `@red-cup-engineering/daleske/blit` | changed tiles to graphics bytes |
| `@red-cup-engineering/daleske/screen` | `PixelScreen` lifecycle adapter |
