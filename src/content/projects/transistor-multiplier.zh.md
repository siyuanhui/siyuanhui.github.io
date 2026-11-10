---
title: "晶体管级 4×4 无符号乘法器"
description: "正在晶体管原理图层级设计一款组合逻辑 4×4 无符号乘法器，输出为 8 位。"
date: "2026-09-01"
period: "2026年秋季"
tags:
  - "EECS 312"
  - "Cadence"
  - "IBM 130 nm CMOS PDK"
language: "zh"
status: "in-progress"
featured: true
featuredOrder: 1
draft: false
translationKey: "transistor-multiplier"
tools: "EECS 312 · Cadence · IBM 130 nm CMOS PDK"
course: "EECS 312"
order: 1
facts:
  - "晶体管原理图层级的组合逻辑 4×4 无符号乘法器，输出为 8 位"
  - "比较部分积压缩方法、加法器结构与晶体管尺寸"
  - "目标函数为能量–延迟–面积，面积以有效 MOSFET 总宽度衡量"
  - "计划中的评估：全部 256 组输入、关键路径跳变测试、能耗与最坏情况延迟"
---

## 问题与目标

正在晶体管原理图层级设计一款组合逻辑 4×4 无符号乘法器，输出为 8 位。该工作在给定电源与负载条件下，比较部分积压缩方法、加法器结构与晶体管尺寸，优化能量–延迟–面积目标函数 E<sub>avg</sub>·D<sub>max</sub>²·A，其中面积以有效 MOSFET 总宽度衡量。

## 测试与验证

计划中的评估包括对全部 256 组输入的穷尽功能验证、关键路径跳变测试，以及能耗与最坏情况延迟仿真。
