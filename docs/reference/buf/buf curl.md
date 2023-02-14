---
id: curl
title: buf curl
sidebar_label: buf curl
sidebar_position: 7
slug: /reference/cli/buf/curl
---
Invoke an RPC endpoint, a la 'cURL'

### Usage
```terminal
$ buf curl <url> [flags]
```

### Description

This command helps you invoke HTTP RPC endpoints on a server that uses gRPC or Connect.

By default, server reflection is used, unless the --reflect flag is set to false. Without server
reflection, a --schema flag must be provided to indicate the Protobuf schema for the method being
invoked.

The only positional argument is the URL of the RPC method to invoke. The name of the method to
invoke comes from the last two path components of the URL, which should be the fully-qualified
service name and method name, respectively.

The URL can use either http or https as the scheme. If http is used then HTTP 1.1 will be used
unless the --http2-prior-knowledge flag is set. If https is used then HTTP/2 will be preferred
during protocol negotiation and HTTP 1.1 used only if the server does not support HTTP/2.

The default RPC protocol used will be Connect. To use a different protocol (gRPC or gRPC-Web),
use the --protocol flag. Note that the gRPC protocol cannot be used with HTTP 1.1.

The input request is specified via the -d or --data flag. If absent, an empty request is sent. If
the flag value starts with an at-sign (@), then the rest of the flag value is interpreted as a
filename from which to read the request body. If that filename is just a dash (-), then the request
body is read from stdin. The request body is a JSON document that contains the JSON formatted
request message. If the RPC method being invoked is a client-streaming method, the request body may
consist of multiple JSON values, appended to one another. Multiple JSON documents should usually be
separated by whitespace, though this is not strictly required unless the request message type has a
custom JSON representation that is not a JSON object.

Request metadata (i.e. headers) are defined using -H or --header flags. The flag value is in
&#34;name: value&#34; format. But if it starts with an at-sign (@), the rest of the value is interpreted as
a filename from which headers are read, each on a separate line. If the filename is just a dash (-),
then the headers are read from stdin.

If headers and the request body are both to be read from the same file (or both read from stdin),
the file must include headers first, then a blank line, and then the request body.

Examples:

Issue a unary RPC to a plain-text (i.e. &#34;h2c&#34;) gRPC server, where the schema for the service is
in a Buf module in the current directory, using an empty request message:

```terminal
$ buf curl --schema . --protocol grpc --http2-prior-knowledge  \
     http://localhost:20202/foo.bar.v1.FooService/DoSomething
```

Issue an RPC to a Connect server, where the schema comes from the Buf Schema Registry, using
a request that is defined as a command-line argument:

```terminal
$ buf curl --schema buf.build/bufbuild/eliza  \
     --data '{"name": "Bob Loblaw"}'          \
     https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Introduce
```

Issue a unary RPC to a server that supports reflection, with verbose output:

```terminal
$ buf curl --data '{"sentence": "I am not feeling well."}' -v  \
     https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say
```

Issue a client-streaming RPC to a gRPC-web server that supports reflection, where custom
headers and request data are both in a heredoc:

```terminal
$ buf curl --data @- --header @- --protocol grpcweb                              \
     https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Converse  \
   <<EOM
Custom-Header-1: foo-bar-baz
Authorization: token jas8374hgnkvje9wpkerebncjqol4

{"sentence": "Hi, doc. I feel hungry."}
{"sentence": "What is the answer to life, the universe, and everything?"}
{"sentence": "If you were a fish, what of fish would you be?."}
EOM
```

Note that server reflection (i.e. use of the --reflect flag) does not work with HTTP 1.1 since the
protocol relies on bidirectional streaming. If server reflection is used, the assumed URL for the
reflection service is the same as the given URL, but with the last two elements removed and
replaced with the service and method name for server reflection.

If an error occurs that is due to incorrect usage or other unexpected error, this program will
return an exit code that is less than 8. If the RPC fails otherwise, this program will return an
exit code that is the gRPC code, shifted three bits to the left.
 

### Flags

```
      --cacert string             Path to a PEM-encoded X509 certificate pool file that contains the set of trusted
                                  certificate authorities/issuers. If omitted, the system's default set of trusted
                                  certificates are used to verify the server's certificate. This option is only valid
                                  when the URL uses the https scheme. It is not applicable if --insecure flag is used
  -E, --cert string               Path to a PEM-encoded X509 certificate file, for using client certificates with TLS. This
                                  option is only valid when the URL uses the https scheme. A --key flag must also be
                                  present to provide tha private key that corresponds to the given certificate
      --connect-timeout float     The time limit, in seconds, for a connection to be established with the server. There is
                                  no limit if this flag is not present
  -d, --data string               Request data. This should be zero or more JSON documents, each indicating a request
                                  message. For unary RPCs, there should be exactly one JSON document. A special value of
                                  '@<path>' means to read the data from the file at <path>. If the path is "-" then the
                                  request data is read from stdin. If the same file is indicated as used with the request
                                  headers flags (--header or -H), the file must contain all headers, then a blank line, and
                                  then the request body. It is not allowed to indicate stdin if the schema is expected to be
                                  provided via stdin as a file descriptor set or image
  -H, --header strings            Request headers to include with the RPC invocation. This flag may be specified more
                                  than once to indicate multiple headers. Each flag value should have the form "name: value".
                                  A special value of '@<path>' means to read headers from the file at <path>. If the path
                                  is "-" then headers are read from stdin. If the same file is indicated as used with the
                                  request data flag (--data or -d), the file must contain all headers, then a blank line,
                                  and then the request body. It is not allowed to indicate stdin if the schema is expected
                                  to be provided via stdin as a file descriptor set or image
  -h, --help                      help for curl
      --http2-prior-knowledge     This flag can be used with URLs that use the http scheme (as opposed to https) to indicate
                                  that HTTP/2 should be used. Without this, HTTP 1.1 will be used with URLs with an http
                                  scheme. For https scheme, HTTP/2 will be negotiate during the TLS handshake if the server
                                  supports it (otherwise HTTP 1.1 is used)
  -k, --insecure                  If set, the TLS connection will be insecure and the server's certificate will NOT be
                                  verified. This is generally discouraged. This option is only valid when the URL uses
                                  the https scheme
      --keepalive-time float      The duration, in seconds, between TCP keepalive transmissions (default 60)
      --key string                Path to a PEM-encoded X509 private key file, for using client certificates with TLS. This
                                  option is only valid when the URL uses the https scheme. A --cert flag must also be
                                  present to provide tha certificate and public key that corresponds to the given
                                  private key
      --no-keepalive              By default, connections are created using TCP keepalive. If this flag is present, they
                                  will be disabled
  -o, --output string             Path to output file to create with response data. If absent, response is printed to stdout
      --protocol string           The RPC protocol to use. This can be one of "grpc", "grpcweb", or "connect" (default "connect")
      --reflect                   If true, use server reflection to determine the schema (default true)
      --reflect-header strings    Request headers to include with reflection requests. This flag may only be used
                                  when --reflect is also set. This flag may be specified more than once to indicate
                                  multiple headers. Each flag value should have the form "name: value". But a special value
                                  of '*' may be used to indicate that all normal request headers (from --header and -H
                                  flags) should also be included with reflection requests. A special value of '@<path>'
                                  means to read headers from the file at <path>. If the path is "-" then headers are
                                  read from stdin. It is not allowed to indicate a file with the same path as used with
                                  the request data flag (--data or -d). Furthermore, it is not allowed to indicate stdin
                                  if the schema is expected to be provided via stdin as a file descriptor set or image
      --reflect-protocol string   The reflection protocol to use for downloading information from the server. This flag
                                  may only be used when server reflection is used. By default, this command will try all known
                                  reflection protocols from newest to oldest. If this results in a "Not Implemented" error,
                                  then older protocols will be used. In practice, this means that "grpc-v1" is tried first,
                                  and "grpc-v1alpha" is used if it doesn't work. If newer reflection protocols are introduced,
                                  they may be preferred in the absence of this flag being explicitly set to a specific protocol.
                                  The valid values for this flag are "grpc-v1" and "grpc-v1alpha". These correspond to services
                                  named "grpc.reflection.v1.ServerReflection" and "grpc.reflection.v1alpha.ServerReflection"
                                  respectively
      --schema string             The module to use for the RPC schema. This is necessary if the server does not support
                                  server reflection. The format of this argument is the same as for the <input> arguments to
                                  other buf sub-commands such as build and generate. It can indicate a directory, a file, a
                                  remote module in the Buf Schema Registry, or even standard in ("-") for feeding an image or
                                  file descriptor set to the command in a shell pipeline.
                                  Setting this flags implies --reflect=false
      --servername string         The server name to use in TLS handshakes (for SNI) if the URL scheme is https. If not
                                  specified, the default is the origin host in the URL or the value in a "Host" header if
                                  one is provided
      --unix-socket string        The path to a unix socket that will be used instead of opening a TCP socket to the host
                                  and port indicated in the URL
  -A, --user-agent string         The user agent string to send
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
