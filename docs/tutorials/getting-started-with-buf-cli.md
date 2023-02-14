---
id: getting-started-with-buf-cli
title: Getting Started with the Buf CLI
description: "Hello Buf CLI! Goodbye manual code generation tasks. let's get started and empower your development
workflow!"
---

The Buf CLI is the ultimate tool for modern, fast, and efficient Protobuf API management. With features such as
formatting, linting, breaking change detection and code generation, Buf offers a comprehensive solution for Protobuf
development and maintenance. Buf is designed to integrate seamlessly with your existing workflow, so you can focus on
what matters most: writing great APIs. Whether you are working with a small, focused project or a massive, complex
system, Buf is the perfect choice. In the next 10 minutes, you will learn how to use the Buf CLI to easily build, lint,
format and generate code for your project.

:::info

We will assume you have already
installed [`buf`](/installation), [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
and [`go`](https://go.dev/dl/) in your `$PATH`. If you haven't, head on over to our [installation](/installation) guide
first.

:::

By the end of this Getting Started guide you will have a strong understanding of the core components of the Buf CLI,
including:

* Buf Modules and how to create & configure them
* Plugins and how to use them to generate code 
* How to use the Buf CLI to lint & format your API schemas
* Detect and prevent breaking changes in your APIs

## Clone the Git repository {#clone-the-git-repository}

First, clone the Git repository that contains the starter code for the `PetStore` service. From the development
directory of your choice, run this command:

```terminal
$ git clone https://github.com/bufbuild/buf-tour
```

You'll notice that the repository contains a `start` directory and a `finish` directory. During this guide you'll work
on files in the `start/getting-started-with-buf-cli` directory, and at the end they should match the files in
the `finish/getting-started-with-buf-cli` directory.

## 1 Configure and build {#configure-and-build}

We'll start our tour by configuring `buf` and building the `.proto` files that define the pet store API, which specifies
a way to create, get, and delete pets in the store.

```terminal
$ cd buf-tour/start/getting-started-with-buf-cli
```

### 1.1 Configure `buf` {#configure-buf}

`buf` is configured with a [`buf.yaml`](/configuration/v1/buf-yaml.md) file, create your own with this command:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ cd proto
$ buf mod init
```

After you run this command, you'll notice a `buf.yaml` in the current directory with the following content:

```yaml title="buf.yaml"
version: v1
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

`buf` assumes there is a `buf.yaml` in your current directory by default, or uses a default value in lieu of
a `buf.yaml`
file. We recommend always having a `buf.yaml` file at the root of your `.proto` files hierarchy, as this is how `.proto`
import paths are resolved.

Before we continue, let's verify that everything is set up properly, and we can build our module. If there are no
errors, we know that we've set up a buf module correctly:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli/proto"
$ buf build 
$ echo $?
---
0
```

:::tip learn more
`buf build` is a powerful tool there's much more to know than what we can cover here, check out
the [Building With Buf](/build/usage) page.
:::

## 2 Generate Code {#generate-code}

`buf` provides a user-friendly experience for generating code locally that's compatible with any reasonable existing
usage of `protoc`, so let's jump in and generate some code.

Move back to the `getting-started-with-buf-cli` directory with this command:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli/proto"
$ cd ..
$ ls
---
proto
```

### 2.1 Configure a `buf.gen.yaml` {#configure-a-bufgenyaml}

Previously you created a `buf.yaml` in the `proto` directory this denotes the root of the buf module. A **module** is a
collection of Protobuf files that are configured, built, and versioned as a logical unit. By moving away from
individual `.proto` files, the **module** simplifies file discovery. Now, we will create a `buf.gen.yaml`.

The [`buf.gen.yaml`](/configuration/v1/buf-gen-yaml.md) file controls how the `buf generate` command executes `protoc`
plugins on a given module. With a `buf.gen.yaml`, you can configure where each `protoc` plugin writes its result and
specify options for each plugin.

Create a `buf.gen.yaml` file in the `getting-started-with-buf-cli` directory:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ touch buf.gen.yaml
$ ls
---
buf.gen.yaml
proto
```

Update the contents of your `buf.gen.yaml` to include Go and Connect-Go plugins:

```yaml title="buf.gen.yaml"
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/bufbuild/buf-tour/gen
plugins:
  - plugin: buf.build/protocolbuffers/go
    out: gen
    opt: paths=source_relative
  - plugin: buf.build/bufbuild/connect-go
    out: gen
    opt: paths=source_relative
```

Given this config, `buf` does two things:

- It executes the [`protocolbuffers/go`](https://buf.build/protocolbuffers/go) plugin to generate Go specific code for
  your `.proto` files and places its output in the `gen` directory.
- It executes the [`bufbuild/connect-go`](https://buf.build/bufbuild/connect-go) plugin to generates client and server
  stubs for connect-go. Compatible with the gRPC, gRPC-Web, and Connect RPC protocols into the `gen` directory. 

Connect is an RPC protocol which supports gRPC — including streaming! They interoperate seamlessly with Envoy, grpcurl, 
gRPC Gateway, and every other gRPC implementation. Connect servers handle gRPC-Web requests natively, without a 
translating proxy. Learn more [here](https://connect.build/).

:::tip but wait, there's more
We are using [Remote Plugins][remote-plugins] here because you no longer have to concern yourself with maintaining,
downloading, or running [plugins][plugins] on your local machine. Local plugins are supported by `buf`,
take a look at the [`buf generate`][generate] docs for more detail.

For a list of all Buf Remote Plugins, check out [buf.build/plugins](https://buf.build/plugins)
:::

:::info Managed Mode
In this example, we enable [**managed mode**](../generate/managed-mode.md)
when [generating code](#configure-a-bufgenyaml). Managed mode is a configuration option in
your [`buf.gen.yaml`](../configuration/v1/buf-gen-yaml.md) that tells `buf` to set all the [file options] in your module
according to an opinionated set of values suitable for each of the supported Protobuf languages. We created managed mode
because those file options have long been a source of confusion and frustration for Protobuf users. Those file options
are set _on the fly_ so that you can remove them from your `.proto` source files.
:::

### 2.2 Generate Go and Connect stubs {#generate-go-and-connect-stubs}

Now that you have a `buf.gen.yaml` with the plugins configured, you can generate the Connect and Go code associated
with the`PetStoreService` API.

Run this command, targeting the input defined in the `proto` directory:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ buf generate proto
---
```

If successful, you'll notice a few new files in the `gen` directory (as configured by the `buf.gen.yaml` created above):

```
getting-started-with-buf-cli
├── buf.gen.yaml
├── gen
│   ├── google
│   │   └── type
│   │       └── datetime.pb.go
│   └── pet
│       └── v1
│           ├── pet.pb.go
│           └── petv1connect
│               └── pet.connect.go
└── proto
    ├── buf.yaml
    ├── google
    │   └── type
    │       └── datetime.proto
    └── pet
        └── v1
            └── pet.proto
```

> That's how easy it is to generate code using `buf`. There's no need to build up a set of complicated `protoc`
> commands; your configuration is contained within the `buf.gen.yaml`. Don't stop here though, we are just getting
> started!

## 3 Lint Your API {#lint-your-api}

Whilst `buf` is a great, simplified, drop-in replacement of `protoc` it's far more than a just a protobuf compiler.
The [`buf` CLI](/installation.mdx) provides linting functionality through the [`buf lint`](/lint/usage.mdx) command. When
you run `buf lint`, `buf` runs a set of [lint rules](/lint/rules.md) across all the Protobuf files covered by
a [`buf.yaml`](/configuration/v1/buf-gen-yaml.md) configuration file.

Run all the configured lint rules by running this command:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ buf lint proto
---
google/type/datetime.proto:17:1:Package name "google.type" should be suffixed with a correctly formed version, such as "google.type.v1".
pet/v1/pet.proto:44:10:Field name "petID" should be lower_snake_case, such as "pet_id".
pet/v1/pet.proto:49:9:Service name "PetStore" should be suffixed with "Service".
```

As you can see, the current pet store API has a few lint failures across both of its files. These failures belong to
the [`DEFAULT`](/lint/rules.md#default) lint category configured in the [`buf.yaml`](/configuration/v1/buf-yaml.md):

```yaml title="proto/buf.yaml" {5-7}
version: v1
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

### 3.1 Fix lint failures {#fix-lint-failures}

Start by fixing the lint failures for the `pet/v1/pet.proto` file, which stem from the 
[`FIELD_LOWER_SNAKE_CASE`](/lint/rules.md#field-lower-snake-case) and [`SERVICE_SUFFIX`](/lint/rules.md#service-suffix) 
rules. `buf` indicates exactly what you need to change to fix the errors, so you can fix the
failures with these updates:

> Take a look at the full set of lint rules [here](/lint/rules.md).

```protobuf title="proto/pet/v1/pet.proto" {8-9,14-15}
syntax = "proto3";

package pet.v1;

...

message DeletePetRequest {
-  string petID = 1;
+  string pet_id = 1;
}

message DeletePetResponse {}

-service PetStore {
+service PetStoreService {
  rpc GetPet(GetPetRequest) returns (GetPetResponse) {}
  rpc PutPet(PutPetRequest) returns (PutPetResponse) {}
  rpc DeletePet(DeletePetRequest) returns (DeletePetResponse) {}
}
```

Verify that two of the failures are resolved by linting again and seeing only one remaining error:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ buf lint
---
google/type/datetime.proto:17:1:Package name "google.type" should be suffixed with a correctly formed version, such as "google.type.v1".
```

### 3.2 Ignore lint failures {#ignore-lint-failures}

The `google/type/datetime.proto` isn't actually a file in your local project. Instead, it's one of your dependencies,
provided by [googleapis](https://buf.build/googleapis/googleapis), so you can't change its `package` declaration to
satisfy `buf`'s lint requirements. `ignore` the `google/type/datetime.proto` file from `buf lint` like with this
config update:

```yaml title="proto/buf.yaml" {8-9}
 version: v1
 breaking:
   use:
     - FILE
 lint:
   use:
     - DEFAULT
+  ignore:
+    - google/type/datetime.proto
```

:::tip
Run `buf lint --error-format=config-ignore-yaml` to get a minimal set of rules to ignore. So you can enable `lint` today
and come back to fix any issues another day.

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ buf lint proto --error-format=config-ignore-yaml
---
version: v1
lint:
  ignore_only:
    PACKAGE_DIRECTORY_MATCH:
      - proto/pet/v1/pet.proto
    SERVICE_SUFFIX:
      - proto/pet/v1/pet.proto
```

For more info on lint rules and configuration, check out our [docs](/lint/overview.md).
:::

## 4 Detect breaking changes {#detect-breaking-changes}

Detect [breaking changes][breaking] between different versions of your API. `buf breaking` runs a set of 
[breaking rules](../breaking/rules.md) across the current version of your entire Protobuf schema in comparison to a 
past version of your Protobuf schema. The rules are selectable, and split up into logical categories depending on the
nature of breaking changes you care about:

- [`FILE`](../breaking/rules.md#categories): Generated source code breaking changes on a per-file basis, that is changes
  that would break the generated stubs where definitions cannot be moved across files.
- [`PACKAGE`](../breaking/rules.md#categories): Generated source code breaking changes on a per-package basis, that is
  changes that would break the generated stubs, but only accounting for package-level changes.
- [`WIRE`][wire]: Wire breaking changes, that is changes that would break wire compatibility, including checks to make
  sure you reserve deleted types of which re-use in the future could cause wire incompatibilities.
- [`WIRE_JSON`](../breaking/rules.md#categories): Wire breaking changes and JSON breaking changes, that is changes that
  would break either wire compatibility or JSON compatibility.

The default value is `FILE`, which we recommend to guarantee maximum compatibility across consumers of your APIs. We
generally suggest choosing only one of these options rather than including/excluding specific breaking change rules, as
you would when specifying a [linting] configuration. Your `buf.yaml` file currently has the `FILE` option configured:

```yaml title="buf.yaml" {2-4}
version: v1
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
  ignore:
    - google/type/datetime.proto
```

### 4.1 Break Your API {#break-your-api}

Next, you'll need to introduce a breaking change. First, make a change that's breaking at the [`WIRE`][wire] level. This
is the most fundamental type of breaking change as it changes how the Protobuf messages are encoded in transit ("on the
wire"). This type of breaking change affects _all_ users in _all_ languages.

For example, change the type of the `Pet.pet_type` field from `PetType` to `string`:

```protobuf title=pet/v1/pet.proto {2-3}
 message Pet {
-  PetType pet_type = 1;
+  string pet_type = 1;
  string pet_id = 2;
  string name = 3;
}
```

### 4.2 Run `buf breaking` {#run-buf-breaking}

Now, verify that this is a breaking change against the local `main` branch. You'll also notice errors related to
the changes you made in the [previous step](#lint-your-api):

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ buf breaking proto --against "../../.git#subdir=start/getting-started-with-buf-cli/proto"
---
proto/pet/v1/pet.proto:1:1:Previously present service "PetStore" was deleted from file.
proto/pet/v1/pet.proto:35:3:Field "1" on message "PutPetRequest" changed type from "enum" to "string".
proto/pet/v1/pet.proto:44:3:Field "1" with name "pet_id" on message "DeletePetRequest" changed option "json_name" from "petID" to "petId".
proto/pet/v1/pet.proto:44:10:Field "1" on message "DeletePetRequest" changed name from "petID" to "pet_id".
```

You can run `buf breaking` on your module by specifying the filepath to the directory containing the `buf.yaml` and 
choosing an [input](/reference/inputs) to compare it against. In the above example, you can target the input 
defined in the current directory and compare it against the remote in the same subdirectory.

### 4.3 Revert changes {#revert-changes}

Once you've determined that your change is breaking, revert it:

```protobuf title=pet/v1/pet.proto {2-3}
 message Pet {
-  string pet_type = 1;
+  PetType pet_type = 1;
  string pet_id = 2;
  string name = 3;
}
```

## 5 Implement an API

In this section, you'll implement a `PetStoreService` client and server, both of which you can run on the command line.

### 5.1 Initialize a `go.mod` {#initialize-a-gomod}

Before you write Go code, initialize a `go.mod` file with the `go mod init` command:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ go mod init github.com/bufbuild/buf-tour
```

Similar to the [`buf.yaml`](/configuration/v1/buf-yaml) config file, the `go.mod` file tracks your code's Go
dependencies.

### 5.2 Implement the server {#implement-the-server}

Start implementing a server by creating a `server/main.go` file:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ mkdir server
$ touch server/main.go
```

Copy and paste this content into that file:

```go title="server/main.go"
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	petv1 "github.com/bufbuild/buf-tour/gen/pet/v1"
	"github.com/bufbuild/buf-tour/gen/pet/v1/petv1connect"
	"github.com/bufbuild/connect-go"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

const address = "localhost:8080"

func main() {
	mux := http.NewServeMux()
	path, handler := petv1connect.NewPetStoreServiceHandler(&petStoreServiceServer{})
	mux.Handle(path, handler)
	fmt.Println("... Listening on", address)
	http.ListenAndServe(
		address,
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(mux, &http2.Server{}),
	)
}

// petStoreServiceServer implements the PetStoreService API.
type petStoreServiceServer struct {
	petv1connect.UnimplementedPetStoreServiceHandler
}

// PutPet adds the pet associated with the given request into the PetStore.
func (s *petStoreServiceServer) PutPet(
	ctx context.Context,
	req *connect.Request[petv1.PutPetRequest],
) (*connect.Response[petv1.PutPetResponse], error) {
	name := req.Msg.GetName()
	petType := req.Msg.GetPetType()
	log.Printf("Got a request to create a %v named %s", petType, name)
	return connect.NewResponse(&petv1.PutPetResponse{}), nil
}
```

### 5.3 Resolve Go dependencies {#resolve-go-dependencies}

Now that you have code for a server, run this command to resolve the dependencies you need to build the code:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ go mod tidy
```

### 5.4 Call `PutPet` {#call-putpet}

With the `server/main.go` implementation shown above, run
the server and call the `PutPet` endpoint from the buf CLI.

First, run the server:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
... Listening on 127.0.0.1:8080
```

In a separate terminal, in the root working directory, hit the API with a `buf curl` command:

```terminal title="~/.../buf-tour/start/getting-started-with-buf-cli"
$ buf curl \
--schema proto/pet/v1/pet.proto \
--data '{"pet_type": "PET_TYPE_SNAKE", "name": "Ekans"}' \
http://localhost:8080/pet.v1.PetStoreService/PutPet
---
{}
```

The Buf CLI is a powerful tool that streamlines the workflow for protocol buffer development. It
provides a simple way to manage your .proto files, perform linting and formatting, and generate code as a drop in
replacement for `protoc`. We hope that this tutorial has helped you understand the benefits of using the Buf CLI and
how to use it effectively in your own projects.

Find out more about building with Buf:

* [Getting Started with the Buf Schema Registry](getting-started-with-bsr)

[breaking]: /breaking/overview

[linting]: /lint/overview

[wire]: ../breaking/rules.md#categories

[zip]: /reference/inputs#zip

[cc_enable_arenas]: /configuration/v1/buf-gen-yaml.md#cc_enable_arenas

[install_protoc]: https://github.com/protocolbuffers/protobuf#protocol-compiler-installation

[java_multiple_files]: /configuration/v1/buf-gen-yaml.md#java_multiple_files

[file options]: https://developers.google.com/protocol-buffers/docs/proto3#options

[remote-plugins]: /bsr/remote-plugins/overview.mdx

[generate]: /generate/usage.mdx

[plugins]: https://buf.build/plugins