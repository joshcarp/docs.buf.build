---
id: convert
title: buf convert
sidebar_label: buf convert
sidebar_position: 6
slug: /reference/cli/buf/convert
---
Convert a message from binary to JSON or vice versa

### Usage
```terminal
$ buf convert <input> [flags]
```

### Description

Use an input proto to interpret a proto/json message and convert it to a different format.

Examples:

```terminal
$ buf convert <input> --type=<type> --from=<payload> --to=<output>
```

The &lt;input&gt; can be a local .proto file, binary output of &#34;buf build&#34;, bsr module or local buf module:

```terminal
$ buf convert example.proto --type=Foo.proto --from=payload.json --to=output.bin
```

All of &lt;input&gt;, &#34;--from&#34; and &#34;to&#34; accept formatting options:

```terminal
$ buf convert example.proto#format=bin --type=buf.Foo --from=payload#format=json --to=out#format=json
```

Both &lt;input&gt; and &#34;--from&#34; accept stdin redirecting:

```terminal
$ buf convert <(buf build -o -)#format=bin --type=foo.Bar --from=<(echo "{\"one\":\"55\"}")#format=json
```

Redirect from stdin to --from:

```terminal
$ echo "{\"one\":\"55\"}" | buf convert buf.proto --type buf.Foo --from -#format=json
```

Redirect from stdin to &lt;input&gt;:

```terminal
$ buf build -o - | buf convert -#format=bin --type buf.Foo --from=payload.json
```

Use a module on the bsr:

```terminal
$ buf convert <buf.build/owner/repository> --type buf.Foo --from=payload.json
```
 

### Flags

```
      --error-format string   The format for build errors printed to stderr. Must be one of [text,json,msvs,junit] (default "text")
      --from string           The location of the payload to be converted. Supported formats are [bin,json] (default "-")
  -h, --help                  help for convert
      --to string             The output location of the conversion. Supported formats are [bin,json] (default "-")
      --type string           The full type name of the message within the input (e.g. acme.weather.v1.Units)
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
