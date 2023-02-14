---
id: generate
title: buf generate
sidebar_label: buf generate
sidebar_position: 10
slug: /reference/cli/buf/generate
---
Generate code with protoc plugins

### Usage
```terminal
$ buf generate <input> [flags]
```

### Description

This command uses a template file of the shape:

```terminal
# buf.gen.yaml
# The version of the generation template.
# Required.
# The valid values are v1beta1, v1.
version: v1
# The plugins to run. "plugin" is required.
plugins:
    # The name of the plugin.
    # By default, buf generate will look for a binary named protoc-gen-NAME on your $PATH.
    # Alternatively, use a remote plugin:
    # plugin: buf.build/protocolbuffers/go:v1.28.1
  - plugin: go
    # The the relative output directory.
    # Required.
    out: gen/go
    # Any options to provide to the plugin.
    # This can be either a single string or a list of strings.
    # Optional.
    opt: paths=source_relative
    # The custom path to the plugin binary, if not protoc-gen-NAME on your $PATH.
    # Optional, and exclusive with "remote".
    path: custom-gen-go
    # The generation strategy to use. There are two options:
    #
    # 1. "directory"
    #
    #   This will result in buf splitting the input files by directory, and making separate plugin
    #   invocations in parallel. This is roughly the concurrent equivalent of:
    #
    #     for dir in $(find . -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq); do
    #       protoc -I . $(find "${dir}" -name '*.proto')
    #     done
    #
    #   Almost every Protobuf plugin either requires this, or works with this,
    #   and this is the recommended and default value.
    #
    # 2. "all"
    #
    #   This will result in buf making a single plugin invocation with all input files.
    #   This is roughly the equivalent of:
    #
    #     protoc -I . $(find . -name '*.proto')
    #
    #   This is needed for certain plugins that expect all files to be given at once.
    #
    # If omitted, "directory" is used. Most users should not need to set this option.
    # Optional.
    strategy: directory
  - plugin: java
    out: gen/java
    # Use the plugin hosted at buf.build/protocolbuffers/python at version v21.9.
    # If version is omitted, uses the latest version of the plugin.
  - plugin: buf.build/protocolbuffers/python:v21.9
    out: gen/python
```

As an example, here&#39;s a typical &#34;buf.gen.yaml&#34; go and grpc, assuming
&#34;protoc-gen-go&#34; and &#34;protoc-gen-go-grpc&#34; are on your &#34;$PATH&#34;:

```terminal
# buf.gen.yaml
version: v1
plugins:
  - plugin: go
    out: gen/go
    opt: paths=source_relative
  - plugin: go-grpc
    out: gen/go
    opt: paths=source_relative,require_unimplemented_servers=false
```

By default, buf generate will look for a file of this shape named
&#34;buf.gen.yaml&#34; in your current directory. This can be thought of as a template
for the set of plugins you want to invoke.

The first argument is the source, module, or image to generate from.
If no argument is specified, defaults to &#34;.&#34;.

Use buf.gen.yaml as template, current directory as input:

```terminal
$ buf generate
```

Same as the defaults (template of &#34;buf.gen.yaml&#34;, current directory as input):

```terminal
$ buf generate --template buf.gen.yaml .
```

The --template flag also takes YAML or JSON data as input, so it can be used without a file:

```terminal
$ buf generate --template '{"version":"v1","plugins":[{"plugin":"go","out":"gen/go"}]}'
```

Download the repository and generate code stubs per the bar.yaml template:

```terminal
$ buf generate --template bar.yaml https://github.com/foo/bar.git
```

Generate to the bar/ directory, prepending bar/ to the out directives in the template:

```terminal
$ buf generate --template bar.yaml -o bar https://github.com/foo/bar.git
```

The paths in the template and the -o flag will be interpreted as relative to the
current directory, so you can place your template files anywhere.

If you only want to generate stubs for a subset of your input, you can do so via the --path. e.g.

Only generate for the files in the directories proto/foo and proto/bar:

```terminal
$ buf generate --path proto/foo --path proto/bar
```

Only generate for the files proto/foo/foo.proto and proto/foo/bar.proto:

```terminal
$ buf generate --path proto/foo/foo.proto --path proto/foo/bar.proto
```

Only generate for the files in the directory proto/foo on your git repository:

```terminal
$ buf generate --template buf.gen.yaml https://github.com/foo/bar.git --path proto/foo
```

Note that all paths must be contained within the same module. For example, if you have a
module in &#34;proto&#34;, you cannot specify &#34;--path proto&#34;, however &#34;--path proto/foo&#34; is allowed
as &#34;proto/foo&#34; is contained within &#34;proto&#34;.

Plugins are invoked in the order they are specified in the template, but each plugin
has a per-directory parallel invocation, with results from each invocation combined
before writing the result.

Insertion points are processed in the order the plugins are specified in the template.
 

### Flags

```
      --config string          The file or data to use for configuration
      --disable-symlinks       Do not follow symlinks when reading sources or configuration from the local filesystem
                               By default, symlinks are followed in this CLI, but never followed on the Buf Schema Registry
      --error-format string    The format for build errors, printed to stderr. Must be one of [text,json,msvs,junit] (default "text")
      --exclude-path strings   Exclude specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                               If specified multiple times, the union is taken
  -h, --help                   help for generate
      --include-imports        Also generate all imports except for Well-Known Types
      --include-wkt            Also generate Well-Known Types. Cannot be set without --include-imports
  -o, --output string          The base directory to generate to. This is prepended to the out directories in the generation template (default ".")
      --path strings           Limit to specific files or directories, e.g. "proto/a/a.proto", "proto/a"
                               If specified multiple times, the union is taken
      --template string        The generation template file or data to use. Must be in either YAML or JSON format
      --type strings           The types (message, enum, service) that should be included in this image. When specified, the resulting image will only include descriptors to describe the requested types. Flag usage overrides buf.gen.yaml
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
