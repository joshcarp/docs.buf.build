---
id: lint
title: buf lint
sidebar_label: buf lint
sidebar_position: 12
slug: /reference/cli/buf/lint
---
Run linting on Protobuf files

### Usage
```terminal
$ buf lint <input> [flags]
```

### Description

The first argument is the source, module, or Image to lint.
The first argument must be one of format [bin,dir,git,json,mod,protofile,tar,zip].
If no argument is specified, defaults to &#34;.&#34;.
 

### Flags

```
      --config string          The file or data to use for configuration
      --disable-symlinks       Do not follow symlinks when reading sources or configuration from the local filesystem
                               By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry
      --error-format string    The format for build errors or check violations printed to stdout. Must be one of [text,json,msvs,junit,config-ignore-yaml] (default "text")
      --exclude-path strings   Exclude specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                               If specified multiple times, the union is taken
  -h, --help                   help for lint
      --path strings           Limit to specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                               If specified multiple times, the union is taken
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf](../buf)	 - The Buf CLI
