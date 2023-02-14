---
id: introduction
title: Introduction
---

Welcome to the **Buf Schema Registry (BSR)**! This overview covers what the BSR
is and the challenges it aims to solve within the Protobuf ecosystem. If you
just want to see the BSR in action with code examples, check out
[The tour](../tutorials/getting-started-with-buf-cli.md).

## What is the BSR?

The BSR stores and manages Protobuf files as versioned
[modules](overview.mdx#modules) so that individuals and organizations can
consume and publish their APIs without friction.

The BSR comes with a browsable UI, dependency management, API validation,
versioning, generated documentation, and an extensible plugin system that powers
remote code generation.

### BSR goals

1. **Centralized registry** - The BSR is the source of truth for tracking and
   evolving your Protobuf APIs. A centralized registry enables you to maintain
   compatibility and manage dependencies, while enabling your clients to consume
   APIs reliably and efficiently. Having a centralized, Protobuf-aware, registry
   has the added benefit of protecting against broken builds.

2. **Dependency management** - The BSR _finally_ introduces dependency
   management to the Protobuf ecosystem. You can now declare, resolve and use
   hosted BSR modules as dependencies in your projects.

Put simply, **you don't need to copy your `.proto` file dependencies around
anymore**. The `buf` CLI interacts directly with the BSR to fetch your
dependencies, (analogous to `npm` for Node.js, `pip` for Python, `cargo` for
Rust, and Go modules in Go).

3. **UI and documentation** - The BSR offers complete documentation for your
   Protobuf files through a browsable UI with syntax highlighting, definitions,
   and references.

4. **Remote Plugins** - The Buf team manages hosted protobuf plugins that can
   be referenced in [`buf.gen.yaml`][buf-gen-yaml] files. Code generation takes
   place remotely on the BSR and generated source code is written out to disk.

5. **Remote Packages**: The BSR exposes generated artifacts through managed
   software repositories you fetch like any other library with tools you already
   know: `go get` or `npm install`.

### Why the BSR?

You're probably wondering why adopting the Buf Schema Registry (BSR) is an
improvement over your existing Protobuf workflows. We've highlighted available 
features above, but let's break down why the BSR aims to solve existing problems.

**The Protobuf ecosystem deserves build guarantees**

Traditional workflows push Protobuf files to version control systems, but these
systems lack Protobuf-awareness and thus consumers often waste time working with
Protobuf files that don't compile. Yes, some organizations add checks to catch
broken Protobuf files, but these are error-prone and don't scale well because
_each_ repository needs to be configured, setup and maintained.

Since the BSR is a Protobuf-aware registry, it prevents Protobuf files that
don't compile from being pushed to the origin in the first place. Your consumers
will have confidence that Protobuf files consumed from the BSR are not broken
and can compile. Everyone in the ecosystem benefits because compilation
guarantees are pushed from the individual to the BSR.

**Generated documentation for all**

Sadly, readily consumable _and_ up-to-date documentation is rarely available for
Protobuf files. Some organizations setup workflows to generate documentation,
but this is yet another manual step that has to be configured, setup and
maintained. Furthermore, much of the tooling and plugins are unsupported and
generate incomplete documentation.

The BSR comes built-in with **generated documentation**. You get live
documentation for every commit to the BSR. Which means live and up-to-date
documentation for latest and historic commits. Even better, the documentation
the BSR provides has syntax highlighting, definitions, and references.

**Keeping Protobuf files synced**

Every organization that adopts Protobufs needs to solve distribution, whether
internally across teams or externally exposed to the public. Protobuf files are
usually checked into repositories, often dispersed, and it becomes challenging
to keep Protobufs synced across projects. API drift is a common issue and even
worse, forked Protobuf repositories accidentally get consumed by downstream
dependents (instead of the upstream). It's a mess.

The BSR solves this by offering a centralized registry to store all your
Protobuf files, simplifying the process of publishing and consuming. By making
the BSR the single source of truth it is possible to power developer workflows
and business processes around Protobuf without worrying _how_ to keep everything
in-sync.

**Client SDKs should not be an afterthought**

Define. Generate. Consume.

Defining a Protobuf-based API enforces a contract between producer and
consumers, however consumers are typically an afterthought in the process.

Before a client can consume a Protobuf-based API they need to generate an SDK
for their language of choice. Traditionally consumers are left to figure out how
to build and generate clients, but this is often cumbersome as little guidance
is provided and not all Protobuf files correctly encode options for a given
language.

Fetching a client SDK from the BSR is a single `npm install` or `go get`
command.

## Let's get started

Once you've [installed](../installation.mdx) the latest version of `buf`, you're
ready to use the BSR!

Here are a few ways to get moving:

- **[Overview](overview.mdx)** <br/> Dive directly into the docs to get familiar
  with the BSR and the various components.

- **[Usage](usage.mdx)** <br/> Learn how to run `buf` commands that use the BSR.

- **[The Tour](/tutorials/getting-started-with-bsr.md)** <br/> The tour provides an overview of
  the BSR and takes approximately 20 minutes to complete.

[buf-gen-yaml]: /configuration/v1/buf-gen-yaml#plugins
