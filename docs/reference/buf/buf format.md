---
id: format
title: buf format
sidebar_label: buf format
sidebar_position: 9
slug: /reference/cli/buf/format
---
Format Protobuf files

### Usage
```terminal
$ buf format <input> [flags]
```

### Description

By default, the source is the current directory and the formatted content is written to stdout.

Examples:

Write the current directory&#39;s formatted content to stdout:

```terminal
$ buf format
```

Most people will want to rewrite the files defined in the current directory in-place with -w:

```terminal
$ buf format -w
```

Display a diff between the original and formatted content with -d
Write a diff instead of the formatted file:
```terminal

$ buf format simple/simple.proto -d

$ diff -u simple/simple.proto.orig simple/simple.proto
--- simple/simple.proto.orig	2022-03-24 09:44:10.000000000 -0700
+++ simple/simple.proto	2022-03-24 09:44:10.000000000 -0700
@@ -2,8 +2,7 @@

 package simple;

-
 message Object {
-    string key = 1;
-   bytes value = 2;
+  string key = 1;
+  bytes value = 2;
 }
```

Use the --exit-code flag to exit with a non-zero exit code if there is a diff:

```terminal
$ buf format --exit-code
$ buf format -w --exit-code
$ buf format -d --exit-code
```

Format a file, directory, or module reference by specifying a source e.g.
Write the formatted file to stdout:
```terminal

$ buf format simple/simple.proto

syntax = "proto3";

package simple;

message Object {
  string key = 1;
  bytes value = 2;
}
```

Write the formatted directory to stdout:

```terminal
$ buf format simple
...
```

Write the formatted module reference to stdout:

```terminal
$ buf format buf.build/acme/petapis
...
```

Write the result to a specified output file or directory with -o e.g.

Write the formatted file to another file:

```terminal
$ buf format simple/simple.proto -o simple/simple.formatted.proto
```

Write the formatted directory to another directory, creating it if it doesn&#39;t exist:

```terminal
$ buf format proto -o formatted
```

This also works with module references:

```terminal
$ buf format buf.build/acme/weather -o formatted
```

Rewrite the file(s) in-place with -w. e.g.

Rewrite a single file in-place:

```terminal
$ buf format simple.proto -w
```

Rewrite an entire directory in-place:

```terminal
$ buf format proto -w
```

Write a diff and rewrite the file(s) in-place:

```terminal
$ buf format simple -d -w

$ diff -u simple/simple.proto.orig simple/simple.proto
...
```

The -w and -o flags cannot be used together in a single invocation.
 

### Flags

```
      --config string          The file or data to use for configuration
  -d, --diff                   Display diffs instead of rewriting files
      --disable-symlinks       Do not follow symlinks when reading sources or configuration from the local filesystem
                               By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry
      --error-format string    The format for build errors printed to stderr. Must be one of [text,json,msvs,junit] (default "text")
      --exclude-path strings   Exclude specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                               If specified multiple times, the union is taken
      --exit-code              Exit with a non-zero exit code if files were not already formatted
  -h, --help                   help for format
  -o, --output string          The output location for the formatted files. Must be one of format [dir,git,protofile,tar,zip]. If omitted, the result is written to stdout (default "-")
      --path strings           Limit to specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                               If specified multiple times, the union is taken
  -w, --write                  Rewrite files in-place
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
