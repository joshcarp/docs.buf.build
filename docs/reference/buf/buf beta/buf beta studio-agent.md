---
id: studio-agent
title: buf beta studio-agent
sidebar_label: buf beta studio-agent
sidebar_position: 3
slug: /reference/cli/buf/beta/studio-agent
---
Run an HTTP(S) server as the Studio agent

### Usage
```terminal
$ buf beta studio-agent [flags]
```

### Flags

```
      --bind string                     The address to be exposed to accept HTTP requests (default "127.0.0.1")
      --ca-cert string                  The CA cert to be used in the client and server TLS configuration
      --client-cert string              The cert to be used in the client TLS configuration
      --client-key string               The key to be used in the client TLS configuration
      --disallowed-header strings       The header names that are disallowed by this agent. When the agent receives an enveloped request with these headers set, it will return an error rather than forward the request to the target server. Multiple headers are appended if specified multiple times
      --forward-header stringToString   The headers to be forwarded via the agent to the target server. Must be an equals sign separated key-value pair (like --forward-header=fromHeader1=toHeader1). Multiple header pairs are appended if specified multiple times (default [])
  -h, --help                            help for studio-agent
      --origin string                   The allowed origin for CORS options (default "https://studio.buf.build")
      --port string                     The port to be exposed to accept HTTP requests (default "8080")
      --server-cert string              The cert to be used in the server TLS configuration
      --server-key string               The key to be used in the server TLS configuration
```

### Flags inherited from parent commands

```
      --debug               Turn on debug logging
      --log-format string   The log format [text,color,json] (default "color")
      --timeout duration    The duration until timing out (default 2m0s)
  -v, --verbose             Turn on verbose mode
```

### Parent Command

* [buf beta](../beta)	 - Beta commands. Unstable and likely to change
