---
id: index
title: buf
sidebar_label: buf
sidebar_position: 0
slug: /reference/cli/buf
---
The Buf CLI

### Usage
```terminal
$ buf [flags]
```

### Description

A tool for working with Protocol Buffers and managing resources on the Buf Schema Registry (BSR)
 

### Flags

```
      --debug               Turn on debug logging
  -h, --help                help for buf
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
      --version             Print the version
```

### Subcommands

* [buf beta](buf/beta)	 - Beta commands. Unstable and likely to change
* [buf breaking](buf/breaking)	 - Verify no breaking changes have been made
* [buf build](buf/build)	 - Build Protobuf files into a Buf image
* [buf convert](buf/convert)	 - Convert a message from binary to JSON or vice versa
* [buf curl](buf/curl)	 - Invoke an RPC endpoint, a la 'cURL'
* [buf export](buf/export)	 - Export proto files from one location to another
* [buf format](buf/format)	 - Format Protobuf files
* [buf generate](buf/generate)	 - Generate code with protoc plugins
* [buf lint](buf/lint)	 - Run linting on Protobuf files
* [buf mod](buf/mod)	 - Manage Buf modules
* [buf push](buf/push)	 - Push a module to a registry
* [buf registry](buf/registry)	 - Manage assets on the Buf Schema Registry

