---
id: index
title: buf beta registry template
sidebar_label: buf beta registry template
sidebar_position: 0
slug: /reference/cli/buf/beta/registry/template
---
Manage Protobuf templates on the Buf Schema Registry

### Usage
```terminal
$ buf beta registry template [flags]
```

### Flags

```
  -h, --help   help for template
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Subcommands

* [buf beta registry template create](template/create)	 - Create a Buf template
* [buf beta registry template delete](template/delete)	 - Delete a template
* [buf beta registry template deprecate](template/deprecate)	 - Deprecate a template
* [buf beta registry template list](template/list)	 - List templates on the specified BSR
* [buf beta registry template undeprecate](template/undeprecate)	 - Undeprecate a template
* [buf beta registry template version](template/version)	 - Manage Protobuf template versions

### Parent Command

* [buf beta registry](../registry)	 - Manage assets on the Buf Schema Registry
