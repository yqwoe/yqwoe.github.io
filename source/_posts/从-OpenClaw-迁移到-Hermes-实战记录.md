---
title: 从 OpenClaw 迁移到 Hermes：我的实战记录
description: 从 OpenClaw 换到 Hermes Agent，迁移过程中遇到的问题、解决方案，以及两个平台记忆系统的真实对比
tags:
  - AI
  - Hermes Agent
  - OpenClaw
  - 迁移
  - 记忆系统
abbrlink: 5f9c1a2b
toc: true
categories:
  - 工作
date: 2026-05-01 22:30:00
---

## 为什么要换

之前用 OpenClaw 做任务管理，用着用着发现几个实在让人头疼的问题。

任务一旦多了，上下文丢失严重——换一个 session，之前记住的东西几乎全部清零。调试的时候找不到之前的日志，找不到上下文，换一个角度问同样的问题，AI 给出的答案完全不一样。记忆管理几乎是靠手动堆砌，key 不一致、同一个信息被存了好几份，混乱得很。

换 Hermes 的动机很简单：**需要一个真正能记住上下文、支持长期记忆、会话之间能无缝衔接的 Agent。**

## 迁移了什么

### 记忆文件

OpenClaw 的 workspace 里有几个核心文件：

- `SOUL.md` — 人设/性格设定
- `AGENTS.md` — 工作指令集
- `MEMORY.md` — 长期记忆
- `USER.md` — 用户信息

迁移到 Hermes 之后，这几个文件分散到了不同的位置：`SOUL.md` 进了 `~/.hermes/SOUL.md`，`AGENTS.md` 需要手动指定目标路径，`MEMORY.md` 和 `USER.md` 合并解析后写入了 `~/.hermes/memories/` 目录。

`hermes claw migrate` 这个命令可以自动完成文件迁移，但要注意它默认在 `--dry-run` 模式下只会预览，不会真的执行。

### Skill

OpenClaw 的 skill 机制和 Hermes 不完全兼容。迁移之后需要重新安装依赖，部分自定义 skill 可能需要手动迁移或者重新编写。

### 配置

OpenClaw 的 `openclaw.json` 里存储了 API keys 和各种配置项。迁移时这些配置默认会保留，但建议迁移完之后仔细核对一遍，特别是 API 相关的配置。

## Hermes 的记忆系统是什么样的

Hermes 的内置记忆分为几个层次：

**短期记忆**通过 system prompt 注入，受 token 数量限制（默认 2200 字符左右），每次对话都会带上前面的上下文。

**用户 Profile** 存在 `~/.hermes/memories/USER.md`，以 `§` 分隔条目，内容相对固定。

**长期记忆**是内置记忆的主要形式，通过 key-value 方式读写，支持 session 之间的信息持久化。

这套机制比 OpenClaw 强不少，但仍然有局限：读取依赖精确的 key 匹配，自然语言描述一变就匹配不上。所以我在 Hermes 基础上又接入了 MemPalace 作为语义记忆层，来弥补这个缺陷。

## 迁移后遇到的问题

第一个问题是记忆丢失。换了新系统之后，Agent 对之前的项目上下文几乎一无所知。需要手动把之前积累的 MEMORY.md 内容迁移过来，并且重新建立记忆规范。

第二个问题是 skill 兼容性。部分 OpenClaw 上的自定义 skill 在 Hermes 上无法直接使用，需要重新安装或者调整。

第三个问题是配置不一致。迁移工具保留了大部分配置，但一些路径相关的设置需要手动核对。

## 两个平台的记忆系统对比

| | OpenClaw | Hermes |
|---|---|---|
| 记忆持久化 | 基本靠文件，session 之间不共享 | 内置 key-value，支持跨 session |
| 语义搜索 | 无 | 无（需借助外部插件） |
| 记忆容量 | 受文件大小限制 | 受 token 限制，约 2200 字符 |
| 迁移工具 | `hermes claw migrate` | 内置，支持预览 |
| Skill 生态 | 独立体系 | Hermes 专属 |

## 总结

从 OpenClaw 到 Hermes，核心收益是记忆持久化和 session 管理。对于需要长期跟踪任务、跨会话保持上下文的人来说，这一步迁移是值得的。但 Hermes 内置记忆仍然有语义匹配的短板，建议配合 MemPalace 等外部记忆系统一起使用效果更好。

迁移本身不算复杂，`hermes claw migrate` 能处理大部分文件迁移工作，主要工作量在于 skill 重装和配置核对。
