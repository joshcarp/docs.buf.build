---
id: create
title: buf beta registry template version create
sidebar_label: buf beta registry template version create
sidebar_position: 1
slug: /reference/cli/buf/beta/registry/template/version/create
---
Create a new template version

### Usage
```terminal
$ buf beta registry template version create <buf.build/owner/templates/template> [flags]
```

### Flags

```
      --config string   The template file or data to use for configuration. Must be in either YAML or JSON format
      --format string   The output format to use. Must be one of [text,json] (default "text")
  -h, --help            help for create
      --name string     The name of the new template version
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf beta registry template version](../version)	 - Manage Protobuf template versions
