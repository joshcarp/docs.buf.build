---
id: export
title: buf export
sidebar_label: buf export
sidebar_position: 8
slug: /reference/cli/buf/export
---
Export proto files from one location to another

### Usage
```terminal
$ buf export <source> [flags]
```

### Description

The first argument is the source or module to export.
The first argument must be one of format [dir,git,mod,protofile,tar,zip].
If no argument is specified, defaults to &#34;.&#34;.

Examples:

Export proto files in &lt;source&gt; to an output directory.

```terminal
$ buf export <source> --output=<output-dir>
```

Export current directory to another local directory. 

```terminal
$ buf export . --output=<output-dir>
```

Export the latest remote module to a local directory.

```terminal
$ buf export <buf.build/owner/repository> --output=<output-dir>
```

Export a specific version of a remote module to a local directory.

```terminal
$ buf export <buf.build/owner/repository:ref> --output=<output-dir>
```

Export a git repo to a local directory.

```terminal
$ buf export https://github.com/owner/repository.git --output=<output-dir>
```
 

### Flags

```
      --config string          The file or data to use for configuration
      --disable-symlinks       Do not follow symlinks when reading sources or configuration from the local filesystem
                               By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry
      --exclude-imports        Exclude imports.
      --exclude-path strings   Exclude specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                               If specified multiple times, the union is taken
  -h, --help                   help for export
  -o, --output string          The output directory for exported files
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