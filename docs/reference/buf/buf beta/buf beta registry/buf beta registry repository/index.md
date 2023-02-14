---
id: index
title: buf beta registry repository
sidebar_label: buf beta registry repository
sidebar_position: 0
slug: /reference/cli/buf/beta/registry/repository
---
Manage repositories

### Usage
```terminal
$ buf beta registry repository [flags]
```

### Flags

```
  -h, --help   help for repository
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Subcommands

* [buf beta registry repository create](repository/create)	 - Create a BSR repository
* [buf beta registry repository delete](repository/delete)	 - Delete a BSR repository
* [buf beta registry repository deprecate](repository/deprecate)	 - Deprecate a BSR repository
* [buf beta registry repository get](repository/get)	 - Get a BSR repository
* [buf beta registry repository list](repository/list)	 - List BSR repositories
* [buf beta registry repository undeprecate](repository/undeprecate)	 - Undeprecate a BSR repository
* [buf beta registry repository update](repository/update)	 - Update BSR repository settings

### Parent Command

* [buf beta registry](../registry)	 - Manage assets on the Buf Schema Registry
