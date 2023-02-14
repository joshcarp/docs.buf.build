---
id: list
title: buf beta registry plugin version list
sidebar_label: buf beta registry plugin version list
sidebar_position: 1
slug: /reference/cli/buf/beta/registry/plugin/version/list
---
List plugin versions

### Usage
```terminal
$ buf beta registry plugin version list <buf.build/owner/plugins/plugin> [flags]
```

### Flags

```
      --format string       The output format to use. Must be one of [text,json] (default "text")
  -h, --help                help for list
      --page-size uint32    The page size (default 10)
      --page-token string   The page token. If more results are available, a "next_page" key is present in the --format=json output
      --reverse             Reverse the results
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf beta registry plugin version](../version)	 - Manage Protobuf plugin versions
