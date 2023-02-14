---
id: index
title: buf beta
sidebar_label: buf beta
sidebar_position: 0
slug: /reference/cli/buf/beta
---
Beta commands. Unstable and likely to change

### Usage
```terminal
$ buf beta [flags]
```

### Flags

```
  -h, --help   help for beta
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Subcommands

* [buf beta migrate-v1beta1](beta/migrate-v1beta1)	 - Migrate v1beta1 configuration to the latest version
* [buf beta registry](beta/registry)	 - Manage assets on the Buf Schema Registry
* [buf beta studio-agent](beta/studio-agent)	 - Run an HTTP(S) server as the Studio agent

### Parent Command

* [buf](../buf)	 - The Buf CLI
