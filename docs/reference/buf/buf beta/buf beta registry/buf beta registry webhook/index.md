---
id: index
title: buf beta registry webhook
sidebar_label: buf beta registry webhook
sidebar_position: 0
slug: /reference/cli/buf/beta/registry/webhook
---
Manage webhooks for a repository on the Buf Schema Registry

### Usage
```terminal
$ buf beta registry webhook [flags]
```

### Flags

```
  -h, --help   help for webhook
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Subcommands

* [buf beta registry webhook create](webhook/create)	 - Create a repository webhook
* [buf beta registry webhook delete](webhook/delete)	 - Delete a repository webhook
* [buf beta registry webhook list](webhook/list)	 - List repository webhooks

### Parent Command

* [buf beta registry](../registry)	 - Manage assets on the Buf Schema Registry
