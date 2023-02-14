---
id: init
title: buf mod init
sidebar_label: buf mod init
sidebar_position: 2
slug: /reference/cli/buf/mod/init
---
Initializes and writes a new buf.yaml configuration file.

### Usage
```terminal
$ buf mod init [buf.build/owner/foobar] [flags]
```

### Flags

```
      --doc             Write inline documentation in the form of comments in the resulting configuration file
  -h, --help            help for init
  -o, --output string   The directory to write the configuration file to (default ".")
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
