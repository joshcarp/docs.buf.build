---
id: build
title: buf build
sidebar_label: buf build
sidebar_position: 4
slug: /reference/cli/buf/build
---
Build Protobuf files into a Buf image

### Usage
```terminal
$ buf build <input> [flags]
```

### Description

The first argument is the source or module to build or image to convert.
The first argument must be one of format [bin,dir,git,json,mod,protofile,tar,zip].
If no argument is specified, defaults to &#34;.&#34;.
 

### Flags

```
      --as-file-descriptor-set   Output as a google.protobuf.FileDescriptorSet instead of an image
                                 Note that images are wire compatible with FileDescriptorSets, but this flag strips
                                 the additional metadata added for Buf usage
      --config string            The file or data to use to use for configuration
      --disable-symlinks         Do not follow symlinks when reading sources or configuration from the local filesystem
                                 By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry
      --error-format string      The format for build errors printed to stderr. Must be one of [text,json,msvs,junit] (default "text")
      --exclude-imports          Exclude imports.
      --exclude-path strings     Exclude specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                                 If specified multiple times, the union is taken
      --exclude-source-info      Exclude source info
  -h, --help                     help for build
  -o, --output string            The output location for the built image. Must be one of format [bin,json] (default "/dev/null")
      --path strings             Limit to specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                                 If specified multiple times, the union is taken
      --type strings             The types (message, enum, service) that should be included in this image. When specified, the resulting image will only include descriptors to describe the requested types
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
