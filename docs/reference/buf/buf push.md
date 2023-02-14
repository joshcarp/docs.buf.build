---
id: push
title: buf push
sidebar_label: buf push
sidebar_position: 16
slug: /reference/cli/buf/push
---
Push a module to a registry

### Usage
```terminal
$ buf push <source> [flags]
```

### Description

The first argument is the source to push.
The first argument must be one of format [dir,git,protofile,tar,zip].
If no argument is specified, defaults to &#34;.&#34;.
 

### Flags

```
      --disable-symlinks      Do not follow symlinks when reading sources or configuration from the local filesystem
                              By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry
      --draft string          Make the pushed commit a draft with the specified name. Cannot be used together with --tag (-t)
      --error-format string   The format for build errors printed to stderr. Must be one of [text,json,msvs,junit] (default "text")
  -h, --help                  help for push
  -t, --tag strings           Create a tag for the pushed commit. Multiple tags are created if specified multiple times. Cannot be used together with --draft
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
