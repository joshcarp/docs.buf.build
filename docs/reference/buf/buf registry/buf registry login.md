---
id: login
title: buf registry login
sidebar_label: buf registry login
sidebar_position: 1
slug: /reference/cli/buf/registry/login
---
Log in to the Buf Schema Registry

### Usage
```terminal
$ buf registry login <domain> [flags]
```

### Description

This prompts for your BSR username and a BSR token and updates your .netrc file with these credentials.
The &lt;domain&gt; argument will default to buf.build if not specified.
 

### Flags

```
  -h, --help              help for login
      --token-stdin       Read the token from stdin. This command prompts for a token by default
      --username string   The username to use. This command prompts for a username by default
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf registry](../registry)	 - Manage assets on the Buf Schema Registry
