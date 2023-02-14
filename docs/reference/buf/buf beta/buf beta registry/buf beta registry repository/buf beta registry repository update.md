---
id: update
title: buf beta registry repository update
sidebar_label: buf beta registry repository update
sidebar_position: 7
slug: /reference/cli/buf/beta/registry/repository/update
---
Update BSR repository settings

### Usage
```terminal
$ buf beta registry repository update <buf.build/owner/repository> [flags]
```

### Flags

```
  -h, --help                help for update
      --visibility string   The repository's visibility setting. Must be one of [public,private].
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf beta registry repository](../repository)	 - Manage repositories
