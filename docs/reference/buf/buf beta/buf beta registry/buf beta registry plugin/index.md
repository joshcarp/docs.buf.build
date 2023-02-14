---
id: index
title: buf beta registry plugin
sidebar_label: buf beta registry plugin
sidebar_position: 0
slug: /reference/cli/buf/beta/registry/plugin
---
Manage Protobuf plugins

### Usage
```terminal
$ buf beta registry plugin [flags]
```

### Flags

```
  -h, --help   help for plugin
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Subcommands

* [buf beta registry plugin create](plugin/create)	 - Create a Protobuf plugin
* [buf beta registry plugin delete](plugin/delete)	 - Delete a Protobuf plugin
* [buf beta registry plugin deprecate](plugin/deprecate)	 - Deprecate a Protobuf plugin
* [buf beta registry plugin list](plugin/list)	 - List plugins on the specified BSR
* [buf beta registry plugin undeprecate](plugin/undeprecate)	 - Undeprecate a plugin
* [buf beta registry plugin version](plugin/version)	 - Manage Protobuf plugin versions

### Parent Command

* [buf beta registry](../registry)	 - Manage assets on the Buf Schema Registry
