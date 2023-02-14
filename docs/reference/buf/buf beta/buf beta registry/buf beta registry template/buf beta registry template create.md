---
id: create
title: buf beta registry template create
sidebar_label: buf beta registry template create
sidebar_position: 1
slug: /reference/cli/buf/beta/registry/template/create
---
Create a Buf template

### Usage
```terminal
$ buf beta registry template create <buf.build/owner/templates/template> [flags]
```

### Flags

```
      --config string       The template file or data to use for configuration. Must be in either YAML or JSON format
      --format string       The output format to use. Must be one of [text,json] (default "text")
  -h, --help                help for create
      --visibility string   The template's visibility setting. Must be one of [public,private]
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf beta registry template](../template)	 - Manage Protobuf templates on the Buf Schema Registry
