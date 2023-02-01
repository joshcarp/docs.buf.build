---
id: api-access
title: API Access
---

Buf Schema Registries provide a web UI at their domain. For example, the web UI for the public
BSR is at [buf.build](https://buf.build/). This is also Buf's main website; if you login, you
will see the BSR interface.

BSRs _**also**_ provide an API server, for programmatic access of BSR functions. For now, the set
of APIs is narrow, but will expand over time to include more of the BSR's capabilities.

The APIs are served from a separate domain from the web UI: they are at an "api" sub-domain.
For example, to send API requests to the public BSR, the domain will be `api.buf.build`.

## Connect

All APIs provided by the BSR are [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call)
services, defined in Protobuf modules available on the public BSR in the
[bufbuild](https://buf.build/bufbuild) organization. They are exposed using
[Connect](https://connect.build/) and support clients using three different protocols:
Connect, [gRPC](https://grpc.io/), and [gRPC-Web](https://github.com/grpc/grpc-web#readme).

Since the APIs are defined in Protobuf, you can use `buf generate` to generate an API client in
a variety of languages. Connect support is still growing, so you can use gRPC clients if you
use a language not yet supported. You can also use [Remote Packages](/bsr/remote-packages/overview)
to download a client from the BSR.

The [Connect protocol](https://connect.build/docs/protocol) also makes it easy to consume
non-streaming (aka “unary”) endpoints from clients that, for whatever reason, cannot use a
generated Connect or gRPC client. For example, you can even use `curl` or `wget` with unary
endpoints. Connect supports JSON encoding of request and response messages out-of-the-box.
Since the API is defined in Protobuf, refer to the
[official JSON mapping documentation](https://protobuf.dev/programming-guides/proto3/#json)
for how a message is represented in JSON.

All APIs are currently exposed at the root URI (currently required for gRPC compatibility).
For example, the URL to use for an RPC to the public BSR looks like so:

> https://api<area/>.buf.build/_&lt;fully.qualified.ServiceName>/&lt;MethodName>_

## Authentication

Most Buf Schema Registry APIs will require the client to be authenticated. Before you begin,
[get an API token](authentication#create-an-api-token) from the BSR settings page. Once you've
got a token, put it in the `Authorization` request header with a schema of `Bearer`, and that
will authenticate your request with a BSR. So the final HTTP request headers should look like
so:

> Authorization: Bearer _&lt;token&gt;_

## Examples

```bash
curl \
   https://api.buf.build/buf.reflect.v1beta1.FileDescriptorSetService/GetFileDescriptorSet \
   -H "Authorization: Bearer ${BUF_TOKEN}" \
   -H "Content-Type: application/json" \
   -X POST -d '{"module": "buf.build/bufbuild/eliza"}'
```

cURL is a great way for us to understand how to access the APIs, but it's unlikely to be
useful in application code. For that, let's look at an example using another feature of the BSR called
[Remote Packages](/bsr/remote-packages/overview), which can generate an API client package
for you to use just like using any other third-party package. For this example, we'll use Go.

To begin, we can navigate to the BSR repository that defines the service we want to use. In
this example, that's [buf.build/bufbuild/reflect](https://buf.build/bufbuild/reflect).
Under the [_Assets_](https://buf.build/bufbuild/reflect/assets/main) tab, there's a list of
plugins and the corresponding Go or NPM package. We're interested in the following two:

  * `protocolbuffers-go` for all of the message types
  * `connect-go` for all of the RPC-related functions

You can see this in the import statements below:

```go
package example

import (
	"context"
	"log"
	"net/http"

	"buf.build/gen/go/bufbuild/reflect/bufbuild/connect-go/buf/reflect/v1beta1/reflectv1beta1connect"
	reflectv1beta1 "buf.build/gen/go/bufbuild/reflect/protocolbuffers/go/buf/reflect/v1beta1"
	"github.com/bufbuild/connect-go"
)

func Example() {
	client := reflectv1beta1connect.NewFileDescriptorSetServiceClient(
		http.DefaultClient,
		"https://api.buf.build",
	)
	request := connect.NewRequest(&reflectv1beta1.GetFileDescriptorSetRequest{
		Module: "buf.build/bufbuild/eliza",
	})
	request.Header().Set("Authorization", "Bearer <BUF_TOKEN>")
	fileDescriptorSet, err := client.GetFileDescriptorSet(context.Background(), request)
	if err != nil {
		log.Fatalf("failed to call file descriptor set service: %v", err)
		return
	}
}
```

As can be seen above, we use the these packages to create an API client, build a request,
and handle the response - just like any other function call.

## Exposed APIs

Below is the list of API categories. The list is short right now, but is expected to grow. As
more of the BSR's functions become sufficiently stable, we will add relevant APIs to this list.

* [Reflection](/bsr/reflection/overview.md)
