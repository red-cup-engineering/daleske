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

From 0.3.0-dev.0, Daleske's `Framebuffer` extends the portable RGBA class from
`@red-cup-engineering/qwzspace/framebuffer`. Edition 0.3.0-dev.1 selects the
received QwzSpace 0.11.0-dev.5 owner. Abrash re-exports that
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

## Received rendering core

QwzSpace 0.11.0-dev.5 receives SignCraft 0.6.1-dev.2, SignGraph 0.7.1-dev.2,
SignChain 0.4.2-dev.1, SignCell 0.13.1-dev.0 and Metrologic 0.14.3-dev.3.
Every adjacent upstream owner is present; the additional core runtime edges
resolve the same editions. This removes the earlier SignChain 0.4.2-dev.0
direct selection of a second Metrologic 0.13.0. Daleske retains its terminal
protocol and tile responsibilities. Legacy compatibility suppliers outside
this core retain separate migration work.

## 0.3.0-dev.1 coherent cohort qualification

The ordinary frozen registry installation of QwzSpace 0.11.0-dev.5 passes all
seven native cases on Node 24.22.1: the original four terminal modules with
54 assertions and the three shared-raster cases. There are zero failures or
skipped cases; runtime and test implementations are unchanged. PNPM 11.25.0
generated the lock through the original supply-chain policy, then received
813 packages through a separate frozen installation with lifecycle scripts
disabled. Only exact selected editions retain release-age exceptions.

The received QwzSpace archive names source commit
`80d21784d39939c6146b1a77f6d3a0ee37ee70aa`; every declared runtime file matches
that Git source. These checks qualify source and terminal protocol bytes.
A combined published raycast receiver and physical terminal presentation
remain distinct receiving steps.

## 0.3.0-dev.0 source qualification

A frozen registry install of QwzSpace 0.11.0-dev.1 passes the original four
terminal test modules (54 assertions) and three shared-raster cases on Node
24.22.1. The shared cases verify inherited method identity, public buffer
fields, clipped edge pixels and alpha, unchanged-tile suppression, decoded
Kitty payloads, and whole-image Kitty/Sixel encoding from the portable owner.
The received QwzSpace archive carries source commit
`922f2d3000a3de2b4b24271463d3f0a18a934d3e`. These checks qualify source and
protocol bytes; physical terminal display is a separate receiving step.
