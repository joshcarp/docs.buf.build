---
id: index
title: buf beta registry
sidebar_label: buf beta registry
sidebar_position: 0
slug: /reference/cli/buf/beta/registry
---
Manage assets on the Buf Schema Registry

### Usage
```terminal
$ buf beta registry [flags]
```

### Flags

```
  -h, --help   help for registry
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Subcommands

* [buf beta registry commit](registry/commit)	 - Manage a repository's commits
* [buf beta registry draft](registry/draft)	 - Manage a repository's drafts
* [buf beta registry organization](registry/organization)	 - Manage organizations
* [buf beta registry plugin](registry/plugin)	 - Manage Protobuf plugins
* [buf beta registry repository](registry/repository)	 - Manage repositories
* [buf beta registry tag](registry/tag)	 - Manage a repository's tags
* [buf beta registry template](registry/template)	 - Manage Protobuf templates on the Buf Schema Registry
* [buf beta registry webhook](registry/webhook)	 - Manage webhooks for a repository on the Buf Schema Registry

### Parent Command

* [buf beta](../beta)	 - Beta commands. Unstable and likely to change
