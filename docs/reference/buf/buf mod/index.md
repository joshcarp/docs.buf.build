---
id: index
title: buf mod
sidebar_label: buf mod
sidebar_position: 0
slug: /reference/cli/buf/mod
---
Manage Buf modules

### Usage
```terminal
$ buf mod [flags]
```

### Flags

```
  -h, --help   help for mod
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Subcommands

* [buf mod clear-cache](mod/clear-cache)	 - Clear Buf module cache
* [buf mod init](mod/init)	 - Initializes and writes a new buf.yaml configuration file.
* [buf mod ls-breaking-rules](mod/ls-breaking-rules)	 - List breaking rules
* [buf mod ls-lint-rules](mod/ls-lint-rules)	 - List lint rules
* [buf mod open](mod/open)	 - Open the module's homepage in a web browser
* [buf mod prune](mod/prune)	 - Prune unused dependencies from thebuf.lock file
* [buf mod update](mod/update)	 - Update a module's dependencies by updating the buf.lock file

### Parent Command

* [buf](../buf)	 - The Buf CLI
