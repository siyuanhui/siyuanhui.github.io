---
title: "LC2K Processor Toolchain & Architecture Simulation"
description: "Built an assembler and ISA simulator in C, then extended the toolchain with object-file generation, symbol resolution, relocation, and multi-file linking."
date: "2026-09-01"
period: "Fall 2026"
tags:
  - "EECS 370"
  - "C"
  - "LC2K assembly"
language: "en"
status: "in-progress"
featured: true
featuredOrder: 2
draft: false
translationKey: "lc2k-toolchain"
tools: "EECS 370 · C · LC2K assembly"
course: "EECS 370"
order: 2
facts:
  - "Assembler and ISA simulator in C, plus object files, symbol resolution, relocation, and multi-file linking"
  - "Cycle-accurate five-stage pipeline in progress, with forwarding, load-use stalls, and predict-not-taken branches"
  - "Scope includes a unified instruction/data cache simulator: configurable block size and associativity, LRU, write-back / write-allocate"
  - "Directed assembly tests for hazards and cache behavior are in scope"
---

## Implementation

Built an assembler and ISA simulator in C, then extended the toolchain with object-file generation, symbol resolution, relocation, and multi-file linking. Currently developing a cycle-accurate five-stage pipeline model with pipeline registers, data forwarding, load-use stalls, and predict-not-taken branches.

## Scope

Scope includes a unified instruction/data cache simulator with configurable block size and associativity, LRU replacement, and write-back / write-allocate policy, plus directed assembly tests for hazards and cache behavior.
