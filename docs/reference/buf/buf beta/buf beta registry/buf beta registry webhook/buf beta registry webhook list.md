---
id: list
title: buf beta registry webhook list
sidebar_label: buf beta registry webhook list
sidebar_position: 3
slug: /reference/cli/buf/beta/registry/webhook/list
---
List repository webhooks

### Usage
```terminal
$ buf beta registry webhook list [flags]
```

### Flags

```
  -h, --help                help for list
      --owner string        The owner name of the repository to list webhooks for
      --remote string       The remote of the owner and repository to list webhooks for
      --repository string   The repository name to list webhooks for.
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf beta registry webhook](../webhook)	 - Manage webhooks for a repository on the Buf Schema Registry
