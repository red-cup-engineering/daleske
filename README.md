# @red-cup-engineering/daleske

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

A raster terminal-interface engine. Daleske owns RGBA framebuffers, changed-tile diffs, Kitty and
Sixel encoders, terminal capability classification, blits, and `PixelScreen`. Its lifecycle and
input are supplied by `@red-cup-engineering/terminal-user-interface-engine`.

It has no domain model. Systems supply framebuffers for Daleske to encode and display. The EAVT
settled-section raster projection and its interactive demonstration live in
`@red-cup-engineering/eavt-terminal-projectors/raster`.

## Public modules

| subpath | capability |
| --- | --- |
| `@red-cup-engineering/daleske/framebuffer` | RGBA framebuffer and tile diff |
| `@red-cup-engineering/daleske/kitty` | Kitty graphics encoding |
| `@red-cup-engineering/daleske/sixel` | Sixel encoding |
| `@red-cup-engineering/daleske/capability` | raster capability classification |
| `@red-cup-engineering/daleske/blit` | changed tiles to graphics bytes |
| `@red-cup-engineering/daleske/screen` | `PixelScreen` lifecycle adapter |
