---
id: introduction
title: What can we help you find?
---

import { Card, Cards } from "@site/src/components/Cards";

<Cards>
  <Card
    image=""
    name="⚡️ Quick Start"
    url="installation"
    description="Download and install Buf on your machine in a few easy steps"
  />
  <Card
    image=""
    name="👨‍💻 Getting Started with the Buf CLI"
    url="/tutorials/getting-started-with-buf-cli"
    description="Learn Buf basics and the benefits of Schema Driven Development"
  />
  <Card
    image=""
    name="🚀 Getting Started with the Buf Schema Registry"
    url="/tutorials/getting-started-with-buf-cli"
    description="Say hello to confidence, simplicity, and ease of use with the Buf Schema Registry."
  />
  <Card
    image=""
    name="🤝 Getting Started with Connect"
    url="https://connect.build/docs/introduction"
    description="Connect is a family of libraries for building browser and gRPC-compatible HTTP APIs."
  />
</Cards>

### Manuals

<Cards>
  <Card
    image="img/logos/cli@2x.png"
    name="The Buf CLI"
    url="/build/usage"
    description="Browse through the Buf CLI manuals and lean how to use simplify your protobuf workflow"
  />
  <Card
    image="img/logos/bsr@2x.png"
    name="The Buf Schema Registry"
    url="/bsr/introduction"
    description="Discover the BSR and the challenges it solves within the Protobuf ecosystem"
  />
</Cards>

## Introduction

Buf's goal is to shift API development toward a
[schema-driven paradigm](https://buf.build/blog/api-design-is-stuck-in-the-past)
and thus pave the way for a future in which APIs are defined in a way that
service owners and clients can depend on.

Defining APIs using an
[IDL](https://en.wikipedia.org/wiki/Interface_description_language) provides a
number of benefits over simply exposing REST/JSON services, and today,
[Protobuf](https://developers.google.com/protocol-buffers) is the most stable,
widely adopted IDL in the industry. But as things stand today, using Protobuf is
much more difficult than using JSON as your data transfer format.

Buf is building tooling to make Protobuf reliable and user friendly for service
owners and clients, while keeping it the obvious choice on the technical merits.
Your organization should not have to reinvent the wheel to create, maintain, and
consume Protobuf APIs efficiently and effectively. We'll handle your Protobuf
management strategy for you, so you can focus on what matters.

## The problems we aim to solve

Traditionally, adopting Protobuf presents a number of challenges across the API
lifecycle. These are the problems we aim to solve:

- **API designs are often inconsistent**: Writing maintainable, consistent
  Protobuf APIs isn't as widely understood as writing maintainable
  REST/JSON-based APIs. With no standards enforcement, inconsistency can arise
  across an organization's Protobuf APIs, and design decisions can inadvertently
  affect your API's future iterability.

- **Dependency management is usually an afterthought**: Protobuf files are
  vendored manually, with an error-prone copy-and-paste process from GitHub
  repositories. Before the [BSR](bsr/introduction.md), there was no centralized
  attempt to track and manage around cross-file dependencies. This is analogous
  to writing JavaScript without `npm`, Rust without `cargo`, Go without modules,
  and all of the other programming language dependency managers we've all grown
  so accustomed to.

- **Forwards and backwards compatibility is not enforced**: While forwards and
  backwards compatibility is a promise of Protobuf, actually maintaining
  backwards-compatible Protobuf APIs isn't widely practiced, and is hard to
  enforce.

- **Stub distribution is a difficult, unsolved process**: Organizations have to
  choose to either centralize their `protoc` workflow and distribute generated
  code, or require all service clients to run `protoc` independently. Because
  there is a steep learning curve to using `protoc` (and the associated `protoc`
  plugins) in a reliable manner, organizations often struggle with distributing
  their Protobuf files and stubs. This creates substantial overhead, and often
  requires a dedicated team to manage the process. Even when using a build
  system like [Bazel](/build-systems/bazel.md), exposing APIs to external
  customers remains problematic.

- **The tooling ecosystem is limited**: Many user-friendly tools exist for
  REST/JSON APIs today. On the other hand, mock server generation, fuzz testing,
  documentation, and other daily API concerns are not widely standardized or
  user friendly for Protobuf APIs. As a result, teams regularly reinvent the
  wheel and build custom tooling to replicate the JSON ecosystem.

## Buf is building a modern Protobuf ecosystem

Our tools address many of the problems above, ultimately allowing you to
redirect much of your time and energy from managing Protobuf files to
implementing your core features and infrastructure.

### The `buf` CLI

The `buf` CLI enables you to create consistent Protobuf APIs that preserve
compatibility and comply with best practices. The tool is currently available on
an open-source basis. The `buf` CLI incorporates these components to help you
create consistent Protobuf APIs:

- A new developed
  [high-performance Protobuf compiler](reference/internal-compiler.md).
- A [linter](lint/overview.md) that enforces good API design choices and
  structure.
- A [breaking change detector](breaking/overview.md) that enforces compatibility
  at the source code or wire level.
- A [generator](generate/usage.mdx) that invokes your `protoc` plugins based on
  a configurable template.

### The Buf Schema Registry (BSR)

The Buf Schema Registry ([BSR](bsr/introduction.md)) is a hosted SaaS platform
that serves as your organization’s source of truth for your Protobuf APIs. The
BSR enables you to centrally maintain compatibility and manage dependencies,
while enabling your clients to consume APIs reliably and efficiently. Similar to
`npm` for JavaScript, `pip` for Python, or `cargo` for Rust, the BSR _finally_
brings dependency management to your Protobuf APIs.

## Where to go from here

See the [installation](installation.mdx) page to install the `buf` CLI.

Next, we recommend completing the [tour](/tutorials/getting-started-with-buf-cli). The tour
provides an overview of most of the existing functionality of Buf and takes
approximately 20 minutes to complete.

After completing the tour, check out the remainder of the documentation for your
specific areas of interest. We've aimed to provide as much documentation as we
can for the various components of Buf to give you a full understanding of Buf's
surface area.

Finally, [follow the project on GitHub](https://github.com/bufbuild/buf), and
[contact us](contact.md) if you'd like to get involved.
