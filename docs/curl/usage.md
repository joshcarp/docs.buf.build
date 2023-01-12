---
id: usage
title: Usage
---

The `buf curl` command lets you invoke RPCs on a Connect, gRPC, or gRPC-Web server. This improves
usability over the standard [cURL](https://curl.se/) utility since `buf curl` handles aspects of
the relevant protocol for you, without you having to define the right headers and craft message
envelopes. It also allows you to provide request data and view response data in JSON format, even
while the on-the-wire format is binary.

```terminal
$ buf curl \
    --data '{"sentence": "I feel happy."}' \
    https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say
---
{"sentence":"Do you often feel happy?"}
```

You can view a listing of all supported options and how to use them by running `buf help curl`.

## RPC Target

The only positional argument is the URL of the RPC method to invoke. The name of the method to
invoke comes from the last two path components of the URL, which should be the fully-qualified
service name and method name, respectively.

```terminal
$ buf curl \
    https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say
```

The URL can use either http or https as the scheme. If http is used then the HTTP 1.1 protocol
will be used unless the `--http2-prior-knowledge` flag is set. If http**s** is used then HTTP/2
will be preferred during protocol negotiation and HTTP 1.1 used only if the server does not
support HTTP/2.

The default RPC protocol used will be [Connect](https://connect.build/docs/protocol). To use a
different protocol, [gRPC](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md) or
[gRPC-Web](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md), use the `--protocol`
flag.

```terminal title="Using gRPC without TLS"
$ buf curl --protocol grpc --http2-prior-knowledge \
    http://localhost:20202/foo.bar.v1.FooService/DoSomething
```

:::note
The gRPC protocol cannot be used with HTTP 1.1, but the other two can as long as
the method being invoked is not a bidirectional streaming method.
:::

## Request Data

The input request is specified via the `-d` or `--data` flag. If absent, an empty request is sent
unless the method uses a request stream, in which case an empty stream is sent.

There are two ways to provide the request body:

1. _Immediate_: The value of the `--data` flag is the request body.
2. _File_: The value of the `--data` flag starts with an at-sign (`@`). The rest of the flag value is
   interpreted as a filename from which to read the request body. If that filename is just a dash (`-`)
   then the request body is read from _stdin_.

The request body is a JSON document that contains the JSON formatted request message. If the RPC method
being invoked is a client-streaming method, the request body may consist of multiple JSON values,
appended to one another. Multiple JSON documents should usually be separated by whitespace, though this
is not strictly required unless the request message type has a custom JSON representation that is not a
JSON object.

If the `--data` flag is specified multiple times, only the value of the last occurrence is used.

## Request Metadata

Request metadata (i.e. headers) are defined using `-H` or `--header` flags. The flag value is in
`name: value` format.

There are two ways to provide the request metadata:
1. _Immediate_: The flag value is in `name: value` format and defines a single header to add to the request.
2. _File_: The value of the `--header` flag starts with an at-sign (`@`). The rest of the flag value is
   interpreted as a filename from which to read request headers, each header on a separate line. If that
   filename is just a dash (`-`) then the request headers are read from _stdin_.

If headers and the request body are both to be read from the same file (or both read from _stdin_),
the file must include headers first, then a blank line, and then the request body:

```text title="Example file with both metadata and data"
Custom-Header-1: foo-bar-baz
Authorization: token jas8374hgnkvje9wpkerebncjqol4

{
   "sentence": "Hi, doc. I feel hungry."
}
```

The `--header` flag may be specified multiple times. The headers sent with the request are the union
of all values provided.

## RPC Schema

Transcoding from the binary Protobuf format to JSON requires access to the schema for the messages
in question. By default, `buf curl` will expect the server to expose the
[server](https://github.com/grpc/grpc/blob/master/src/proto/grpc/reflection/v1/reflection.proto)
[reflection](https://github.com/bufbuild/connect-grpcreflect-go/)
[service](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md#known-implementations).

If the server does not support reflection, you can instead indicate the schema to use via a
`--schema` option. This option accepts the same kind of [inputs](../reference/inputs.md) as
`buf build` and `buf generate`, letting you point to Protobuf sources on disk, in a Git repo, or in
a [BSR](../bsr/introduction.md) module.

```terminal
$ buf curl \
   --schema buf.build/bufbuild/eliza \
   --data '{"name": "Bob Loblaw"}' \
   https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Introduce
```

### Server Reflection

By default, `buf curl` will try the latest and most appropriate server reflection protocol and
then fallback to other protocols if necessary. As of this writing, there are two protocols supported:
1. **grpc-v1**: This corresponds to version "v1" of the gRPC server reflection service
   ([source](https://github.com/grpc/grpc/blob/master/src/proto/grpc/reflection/v1/reflection.proto)).
   This is the preferred version and is attempted first.
2. **grpc-v1alpha**: This corresponds to version "v1alpha" of the same reflection service
   ([source](https://github.com/grpc/grpc/blob/master/src/proto/grpc/reflection/v1alpha/reflection.proto)).
   Many gRPC servers only support this older version.

If you know the server only supports v1alpha, you can use `--reflect-protocol=grpc-v1alpha` to have
`buf curl` use that instead of first trying v1.

You can separately configure headers used for reflection requests using `--reflect-header` flags. If
you want `buf curl` to send all of the same headers as for the main RPC invocation, you can use
`--reflect-header=*`.

If server reflection is used, the assumed URL for the reflection service is the same as
the given RPC target URL, but with the last two path elements removed and replaced with the service
and method name for the server reflection protocol.

:::note
Server reflection does not currently work with HTTP 1.1 since the supported reflection
protocols rely on bidirectional streaming.
:::

## Output

By default, `buf curl` will print the response message(s) to _stdout_ in JSON format. If an RPC
error occurs, the error information is printed to _stderr_, also in JSON format, and the exit
code will be the [gRPC error code](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)
shifted three bits to the left. A non-zero exit code that is less than eight indicates incorrect
usage or other unexpected error.

You can enable verbose output via the `-v` or `--verbose` flag. This will generate a lot of output
to _stderr_ which may be helpful for troubleshooting, including details related to TLS and traces
of all RPC activity, including server reflection calls.

## Examples

Issue a unary RPC to a plain-text (i.e. "h2c") gRPC server, where the schema for the service is
in a Buf module in the current directory, using an empty request message:

```terminal
$ buf curl --schema . --protocol grpc --http2-prior-knowledge \
   http://localhost:20202/foo.bar.v1.FooService/DoSomething
```

Issue an RPC to a Connect server, where the schema comes from the Buf Schema Registry, using
a request that is defined as a command-line argument:

```terminal
$ buf curl \
   --schema buf.build/bufbuild/eliza \
   --data '{"name": "Bob Loblaw"}' \
   https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Introduce
---
{"sentence":"Hi Bob Loblaw. I'm Eliza."}
{"sentence":"Before we begin, Bob Loblaw, let me tell you something about myself."}
{"sentence":"I was created by Joseph Weizenbaum."}
{"sentence":"How are you feeling today?"}
```

Issue a unary RPC to a server that supports reflection, with verbose output:

```terminal
$ buf curl -v \
   --data '{"sentence": "I am not feeling well."}' \
   https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say
---
buf: * Using server reflection to resolve "buf.connect.demo.eliza.v1.ElizaService"
buf: * Dialing (tcp) demo.connect.build:443...
buf: * Connected to 35.227.208.237:443
buf: * TLS connection using TLSv1.3 / TLS_AES_128_GCM_SHA256
buf: * ALPN, server accepted protocol h2
buf: * Server certificate:
buf: *   subject: CN=demo.connect.build
buf: *   start date: 2022-12-25 19:53:17 +0000 UTC
buf: *   end date: 2023-03-25 20:44:49 +0000 UTC
buf: *   subjectAltNames: [demo.connect.build]
buf: *   issuer: CN=GTS CA 1D4,O=Google Trust Services LLC,C=US
buf: * Server certificate chain verified
buf: * Server certificate is valid for demo.connect.build
buf: > (#1) POST /grpc.reflection.v1.ServerReflection/ServerReflectionInfo
buf: > (#1) Accept-Encoding: identity
buf: > (#1) Connect-Accept-Encoding: gzip
buf: > (#1) Connect-Protocol-Version: 1
buf: > (#1) Connect-Timeout-Ms: 119999
buf: > (#1) Content-Type: application/connect+proto
buf: > (#1) User-Agent: connect-go/1.4.1 (go1.19.3)
buf: > (#1)
buf: } (#1) [5 bytes data]
buf: } (#1) [40 bytes data]
buf: < (#1) HTTP/2.0 200 OK
buf: < (#1) Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
buf: < (#1) Connect-Accept-Encoding: gzip
buf: < (#1) Connect-Content-Encoding: gzip
buf: < (#1) Content-Type: application/connect+proto
buf: < (#1) Date: Wed, 11 Jan 2023 18:42:27 GMT
buf: < (#1) Server: Google Frontend
buf: < (#1) Traceparent: 00-42685e452dcc166e0071a9d14b7adda4-97faf80b4e2ea581-01
buf: < (#1) Vary: Origin
buf: < (#1) Via: 1.1 google
buf: < (#1) X-Cloud-Trace-Context: 42685e452dcc166e0071a9d14b7adda4/10951338171344790913;o=1
buf: < (#1)
buf: { (#1) [5 bytes data]
buf: { (#1) [975 bytes data]
buf: * Server reflection has resolved file "buf/connect/demo/eliza/v1/eliza.proto"
buf: * Invoking RPC buf.connect.demo.eliza.v1.ElizaService.Say
buf: > (#2) POST /buf.connect.demo.eliza.v1.ElizaService/Say
buf: > (#2) Accept-Encoding: gzip
buf: > (#2) Connect-Protocol-Version: 1
buf: > (#2) Connect-Timeout-Ms: 119823
buf: > (#2) Content-Type: application/proto
buf: > (#2) User-Agent: buf/1.12.0 connect-go/1.4.1 (go1.19.3)
buf: > (#2)
buf: } (#2) [24 bytes data]
buf: * (#2) Finished upload
buf: < (#2) HTTP/2.0 200 OK
buf: < (#2) Accept-Encoding: gzip
buf: < (#2) Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
buf: < (#2) Content-Length: 42
buf: < (#2) Content-Type: application/proto
buf: < (#2) Date: Wed, 11 Jan 2023 18:42:27 GMT
buf: < (#2) Server: Google Frontend
buf: < (#2) Traceparent: 00-0c204b31fb17714d8203dd77d177b699-6b7f2a2cbcae59cf-00
buf: < (#2) Vary: Origin
buf: < (#2) Via: 1.1 google
buf: < (#2) X-Cloud-Trace-Context: 0c204b31fb17714d8203dd77d177b699/7745956255733012943
buf: < (#2)
buf: { (#2) [42 bytes data]
buf: * (#2) Call complete
{"sentence":"How long have you been not feeling well?"}
buf: { (#1) [5 bytes data]
buf: { (#1) [2 bytes data]
buf: * (#1) Call complete
```

Issue a client-streaming RPC to a gRPC-web server that supports reflection, where custom
headers and request data are both in a _heredoc_:

```terminal
$ buf curl --data @- --header @- --protocol grpcweb \
   https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Converse \
   <<EOM
Custom-Header-1: foo-bar-baz
Authorization: token jas8374hgnkvje9wpkerebncjqol4

{"sentence": "Hi, doc. I feel hungry."}
{"sentence": "What is the answer to life, the universe, and everything?"}
{"sentence": "If you were a fish, what kind of fish would you be?."}
EOM
---
{"sentence":"When you feel hungry, what do you do?"}
{"sentence":"How would an answer to that help you?"}
{"sentence":"Why do you say that about me?"}
```
