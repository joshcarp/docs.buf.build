---
id: prune
title: buf mod prune
sidebar_label: buf mod prune
sidebar_position: 6
slug: /reference/cli/buf/mod/prune
---
Prune unused dependencies from thebuf.lock file

### Usage
```terminal
$ buf mod prune <directory> [flags]
```

### Description

The first argument is the directory of the local module to prune. Defaults to &#34;.&#34; if no argument is specified
 

### Flags

```
  -h, --help   help for prune
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf mod](../mod)	 - Manage Buf modules
