---
id: getting-started-with-bsr
title: Getting Started with the Buf Schema Registry
---

In this guide you will gain strong understanding of the Buf Schema Registry and its APIs, create a repository and 
push a module with generated documentation. Most of all you'll familiarise yourself with Dependency Management, 
powered by the BSR, solving one of the greatest challenges of the protobuf ecosystem. In the end, you will put it all 
together to build an API client with Remote Packages.

:::info

We will assume you have already
installed [`buf`](/installation), [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
and [`go`](https://go.dev/dl/) in your `$PATH`. If you haven't, head on over to our [installation](/installation) guide
first.

:::

By the end of this Getting Started guide you will have a strong understanding of the core components of the Buf Schema
Registry, including:

* Create a Repository & Push a Buf Module
* Generate Documentation
* Utilise dependency management for well known types
* Build an API using Remote Packages

### Clone the Git repository {#clone-the-git-repository}

First, clone the Git repository that contains the starter code for the `PetStore` service. From the development
directory of your choice, run this command:

```terminal
$ git clone https://github.com/bufbuild/buf-tour
```

You'll notice that the repository contains a `start/getting-started-with-bsr` directory and
a `finish/getting-started-with-bsr` directory. Here you will find an already configured `buf` module that
define the pet store API, which specifies a way to create, get, and delete pets in the store and some generated code to
build an API server and client.

We'll start in the `start/getting-started-with-bsr` directory

```terminal
$ cd buf-tour/start/getting-started-with-bsr
```

## 1 Log in {#login}

If you haven't already, [Sign Up][signup] for the Buf Schema Registry. Otherwise, visit [buf.build/login][login], and
you'll be prompted with a few different login options, including Google, GitHub, and traditional email and password.

After you've successfully authenticated, you'll be prompted to select a username and complete your registration. If
successful, you should see that you're logged in and that your username is rendered in the upper right-hand corner.

:::tip
Throughout this guide, you'll see references to `<USER>` as your newly created BSR username.
:::

### 1.1 Create an API Token {#create-an-api-token}

Now that you're logged in:

1. Visit the [buf.build/settings/user][user] page.
2. Click the **Create New Token** button.
3. Select an expiration time.
   You can optionally add a note for yourself to distinguish this token from others (we recommend that
   you name this `CLI`, `Development`, or something else along those lines).
4. Click **Create**.
5. Copy the token to your clipboard.
   You will use this throughout the rest of the guide.

### 1.2 `buf registry login` {#buf-login}

All you need to log in is the API token created above. Run this command to do so:

```terminal title="~/.../start/getting-started-with-bsr/"
$ buf registry login
---
Log in with your Buf Schema Registry username. If you don't have a username, create one at https://buf.build.

Username: <YOUR USERNAME>
Token: <YOUR TOKEN>
```

## 2 Push a Module {#push-a-module}

Now that you've authenticated with the [BSR](../bsr/overview.mdx), you can create a repository and push
a [module](../bsr/overview.mdx#modules) that defines the `PetStoreService` API.

**Modules** are the core primitive of Buf and the BSR. A module is a collection of Protobuf files that are configured,
built, and versioned as a logical unit. You created a module when you initialized
a [`buf.yaml`](../configuration/v1/buf-yaml.md) at the beginning of the tour.

### 2.1 Create a repository {#create-a-repository}

A module is stored in a **repository**. A repository stores all versions of a module, where each version is identified
by a commit, (optionally) a tag, and/or (optionally) a draft. While roughly analogous to Git repositories, a BSR
repository is only a remote location - there is no concept of a repository "clone". In other words, repositories do not
exist in multiple locations.

Create a new repository:

1. Navigate to the [home page](https://buf.build)
1. Select your username in the top right corner
1. Click "Repositories" from the dropdown
1. Clicking on "Create repository"
1. Name the repository `petapis`. For the purposes of this guide, we will keep the repository public.

You should now be presented with an empty repository called `petapis`. Next up, we will find out how to push
a module.

### 2.2 Configure a `name` {#configure-a-name}

Back in your terminal, move into the `proto` directory:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ cd proto
```

Update your `buf.yaml` so that its `name` matches the repository you just created:

```yaml title="buf.yaml" {2}
  version: v1
  + name: buf.build/<USER>/petapis
    breaking:
      use:
        - FILE
    lint:
      use:
        - DEFAULT
```

### 2.3 Push the module {#push-the-module}

Push the module to the `buf.build/<USER>/petapis` repository with this command (in the `proto` directory containing
your `buf.yaml`):

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ buf push
---
19bcefa1a736428d9e64d21c9191b213
```

> The pushed module will create a commit, this is included in the CLI output. Your value will differ.

Behind the scenes, `buf` recognizes the `name` in your `buf.yaml` and pushes the module to
the `buf.build/<USER>/petapis` repository. If successful, the generated commit identifies this current version of
your module.

## 3 View generated documentation {#view-generated-documentation}

You can browse generated documentation for your [module](../bsr/overview.mdx#modules) in the [BSR](../bsr/overview.mdx).

Navigate to the `/docs` page for the module you just created in your browser. If your `<USER>` variable is set
to `acme` and you created the `buf.build/acme/petapis` module, you can visit the
[buf.build/acme/petapis/docs](https://buf.build/acme/petapis/docs) page (replace `acme` with your `<USER>` in
this link).

### 3.1 Add a `buf.md` {#add-a-bufmd}

The page you see above serves as the primary entrypoint for your module's documentation. But as you can see from the
default `buf.md` content, we currently don't have any module-level documentation.

You can update the module-level documentation page by creating a `buf.md` in the same directory as your
module's [`buf.yaml`](../configuration/v1/buf-yaml.md), and pushing it up to the BSR. In this way, the `buf.md` file is
analogous to a GitHub repository's `README.md`. The `buf.md` file currently supports all
the [CommonMark](https://commonmark.org) syntax.

Let's start by adding a quick note:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ touch buf.md
```

```markdown title="buf.md"
## PetAPIs

This module contains all the APIs required to interact with the
`PetStoreService`.
```

Your `proto` directory should now look like this:

```sh
proto/
├── buf.md
├── buf.yaml
├── google
│   └── type
│       └── datetime.proto
└── pet
    └── v1
        └── pet.proto
```

Now if you push your module again, you'll notice a new commit and that the documentation has been updated to reflect the
latest changes:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ buf push
---
4514ddced0584e73a100e82096c7958c
```

If you refresh the documentation page you visited above, you should see the changes you just introduced with your
`buf.md` documentation.

### 3.2 Package documentation {#package-documentation}

As you can see from the module documentation page, both the `pet.v1` and `google.type` packages are available as links.
Click on the `pet.v1` link to navigate to its package documentation
at [buf.build/acme/petapis/docs/4514ddced0584e73a100e82096c7958c/pet.v1](https://buf.build/acme/petapis/docs/4514ddced0584e73a100e82096c7958c/pet.v1).
From here, you can click through each of the Protobuf type definitions and see all the comments associated with each
type. In fact, if you click on the `google.type.DateTime` message referenced in the `Pet` message, you'll be brought to
the `google.type.v1` package documentation for the same commit.

> For an example of API documentation, check out [buf.build/googleapis/googleapis](https://buf.build/googleapis/googleapis/docs).

## 4 Add a dependency

Without the [BSR](../bsr/overview.mdx), you can only depend on other Protobuf APIs by manually fetching the `.proto`
files you need. Historically, if you wanted to use [`googleapis`](https://github.com/googleapis/googleapis), for
example, you'd need to
clone the right Git repository and copy the `.proto` file(s) you need in order to compile your own `.proto` files. And
if `googleapis` has its own external dependencies, then you need to fetch those as well.

Even worse, this way of managing dependencies is prone to API drift, where the `googleapis` code may evolve over time,
leaving your local copies inconsistent with the latest version and your modules thus out of date. It turns out that this
is exactly what you did with the `PetStoreService`: the `google/type/datetime.proto` file is actually present in your
local directory and currently used to build your [module](../bsr/overview.mdx#modules).

Now that you're familiar with the BSR, you can simplify this entire workflow immensely.

### 4.1 Remove the `datetime.proto` file {#remove-datetime-proto}

Start by removing the `google/type/datetime.proto` file from your module altogether. From within the `proto`
directory, run this command to remove_all_ the local `google` dependencies:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ rm -r google
```

Now remove the `google/type/datetime.proto` reference from your [`buf.yaml`](../configuration/v1/buf-yaml.md):

```yaml title="buf.yaml" {6-7}
 version: v1
 name: buf.build/<USER>/petapis
 breaking:
   use:
     - FILE
 lint:
   use:
     - DEFAULT
     - ignore:
     - - google/type/datetime.proto
```

If you try to build the module in its current state, you will notice an error:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ buf build
---
pet/v1/pet.proto:7:8:google/type/datetime.proto: does not exist
```

### 4.2 Depend on `googleapis` {#depend-on-googleapis}

You can resolve this error by configuring a dependency in your `buf.yaml`'s [`deps`](/configuration/v1/buf-yaml#deps)
key. The `google/type/datetime.proto` file is provided by the `buf.build/googleapis/googleapis` module, so you can
configure it like this:

```yaml title="buf.yaml" {3-4}
 version: v1
 name: buf.build/<USER>/petapis
 +deps:
   +  - buf.build/googleapis/googleapis
 breaking:
   use:
     - FILE
 lint:
   use:
     - DEFAULT
```

Now, if you try to build the module again, you'll notice this:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ buf build
---
WARN	Specified deps are not covered in your buf.lock, run "buf mod update":
	- buf.build/googleapis/googleapis
pet/v1/pet.proto:7:8:google/type/datetime.proto: does not exist
```

`buf` detected that you specified a dependency that isn't included in the module'
s [`buf.lock`](../configuration/v1/buf-lock.md) file. This file is a dependency manifest for your module, representing a
single reproducible build of your module's dependencies. You don't have a `buf.lock` file yet because you haven't
specified any external dependencies, but you can create one with the command that `buf` recommended above:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ buf mod update
```

The `buf mod update` command updates all of your `deps` to their latest version.
The generated `buf.lock` should look similar to this (the `commit` may vary):

```yaml title="buf.lock"
# Generated by buf. DO NOT EDIT.
version: v1
deps:
  - remote: buf.build
    owner: googleapis
    repository: googleapis
    commit: 62f35d8aed1149c291d606d958a7ce32
```

Now, if you try to build the module again, you'll notice that it's successful:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ buf build
---
buf: downloading buf.build/googleapis/googleapis:62f35d8aed1149c291d606d958a7ce32
```

This is the BSR's dependency management in action! A few things happened here, so let's break it down:

1. `buf` noticed that a new dependency was added to the `deps` key.
2. `buf` resolved the latest version of the `buf.build/googleapis/googleapis` module and wrote it to the
   module's `buf.lock`.
3. When another `buf` command is run, `buf` downloads the `buf.build/googleapis/googleapis` module to the
   local [module cache](../bsr/overview.mdx#module-cache).
4. Finally, now that `buf` has all the dependencies it needs, it can successfully build the module (
   as `google/type/datetime.proto` is included).

In summary, `buf` can resolve the dependencies specified in your `buf.yaml`'s `deps` key and include the imports
required to build your module. **You don't have to manually copy `.proto` files anymore!**

### 4.3 Push Your Changes {#push-your-changes}

Now that you've updated your module to depend on `buf.build/googleapis/googleapis` instead of vendoring
the `google/type/datetime.proto` yourself, you can push the module to the BSR:

```terminal title="~/.../start/getting-started-with-bsr/proto/"
$ buf push
---
b2917eb692064beb92ad1e38dba6c25e
```

Navigate back to your repository on the BSR and see your packages have changed, the Google package is no longer a
first-class citizen of your module - it is now a third-party dependency.

> If one or more dependencies are pinned to a draft commit, pushing the module will not be allowed.

### 4.4 Update `buf.gen.yaml` {#update-buf-gen-yaml}

Your `gen/` directory should look like this

```
gen
├── google
│   └── type
│       └── datetime.pb.go
└── pet
    └── v1
        ├── pet.pb.go
        └── petv1connect
            └── pet.connect.go
```

Now that you have exchanged your local copy of the Google proto for one on the BSR, you can now remove the generated
code, also.

```terminal title="~/.../start/getting-started-with-bsr/proto"
$ cd ..
$ rm -r gen
```

Start by updating the `buf.gen.yaml` to exclude overriding any Go import statements related to googleapis.

```yaml title="buf.gen.yaml"
 version: v1
 managed:
   enabled: true
   go_package_prefix:
     default: github.com/bufbuild/buf-tour/petstore/gen
 +    except:
   +      - buf.build/googleapis/googleapis
 plugins:
   - plugin: buf.build/protocolbuffers/go
     out: gen
     opt: paths=source_relative
            - plugin: buf.build/bufbuild/connect-go
            out: gen
            opt: paths=source_relative
```

```terminal title="~/.../start/getting-started-with-bsr/"
$ buf generate proto
```

Now, your `gen/` directory should look like this:

```
gen
└── pet
    └── v1
        ├── pet.pb.go
        └── petv1connect
            └── pet.connect.go
```

## 5 Implement the API {#implement-the-api}

In this section, you'll implement a `PetStoreService` client, which you can run on the command line.

### 5.1 Fetch Remote Packages {#fetch-remote-packages}

The Buf Schema Registry provides remote packages for Golang: consume generated SDKs from modules and plugins using go
get, just like any other Golang library. This means if you use the BSR, there's no need to manage generated code. You
can view all of your modules Remote Package options in the assets tab of its repository.

let's fetch a few packages for the client we are building, in this example, we will get the Go base-types
in `protocolbuffers/go` and Connect API stubs in `bufbuild/connect-go`.

```terminal title="~/.../start/getting-started-with-bsr/"
$ go get buf.build/gen/go/<USER>/petapis/protocolbuffers/go
$ go get buf.build/gen/go/<USER>/petapis/bufbuild/connect-go
```

### 5.3 Implement the client {#implement-the-client}

You can start implementing a client by creating a `client/main.go` file:

```terminal title="~/.../start/getting-started-with-bsr/"
$ mkdir client
$ touch client/main.go
```

Copy and paste this content into that file:

```go title="client/main.go"
package main

import (
	"context"
	"log"
	"net/http"

    // replace <USER> with your BSR username
	"buf.build/gen/go/<USER>/petapis/bufbuild/connect-go/pet/v1/petv1connect"
	petv1 "buf.build/gen/go/<USER>/petapis/protocolbuffers/go/pet/v1"
	"github.com/bufbuild/connect-go"
)

func main() {
	client := petv1connect.NewPetStoreServiceClient(
		http.DefaultClient,
		"http://localhost:8080",
	)
	res, err := client.PutPet(
		context.Background(),
		connect.NewRequest(&petv1.PutPetRequest{
			PetType: petv1.PetType_PET_TYPE_SNAKE,
			Name:    "Ekans",
		}),
	)
	if err != nil {
		log.Println(err)
		return
	}
	log.Println(res.Msg)
}
```

### 5.4 Resolve Go dependencies {#resolve-go-dependencies}

Now that you have code for both a client and a server, run this command to resolve some of the dependencies you need for
the generated code:

```terminal title="~/.../start/getting-started-with-bsr/"
$ go mod tidy
```

You should notice these changes (the version pins may differ):

```sh title="go.mod"
module github.com/bufbuild/buf-tour/petstore

go 1.19

require (
	buf.build/gen/go/<USER>/petapis/bufbuild/connect-go v1.5.1-20230203192357-a60a321c3624.1
	buf.build/gen/go/<USER>/petapis/protocolbuffers/go v1.28.1-20230203192357-a60a321c3624.4
	github.com/bufbuild/connect-go v1.5.1
	golang.org/x/net v0.5.0
	google.golang.org/genproto v0.0.0-20230202175211-008b39050e57
	google.golang.org/protobuf v1.28.1
)

require golang.org/x/text v0.6.0 // indirect
```

### 5.5 Call `PutPet` {#call-putpet}

With the `server/main.go` and `client/main.go` implementations shown above, run
the server and call the `PutPet` endpoint from the client.

First, run the server:

```terminal title="~/.../start/getting-started-with-bsr/"
$ go run server/main.go
---
... Listening on 127.0.0.1:8080
```

In a separate terminal, run the client and you should see a success message:

```terminal title="~/.../start/getting-started-with-bsr/"
$ go run client/main.go
---
... Connected to 127.0.0.1:8080
... Successfully PutPet
```

You'll also notice this in the server logs (in the other terminal running the
server):

```terminal title="~/.../start/getting-started-with-bsr/server/main.go output"
... Listening on 127.0.0.1:8080
... Got a request to create a PET_TYPE_SNAKE named Ekans
```

That's it! that's all you need to do to build a module, publish it to the world and build an API server and client using
Buf. Try and imagine this at scale, the Buf Schema Registry is your central hub collaborate and share APIs, SDKs and
documentation.

To find out more about how you can build better with Buf, check out some of our other guides just like this one:

* [Getting Started with the Buf CLI](getting-started-with-buf-cli.md)

[bsr]: /bsr/introduction.md

[login]: https://buf.build/login

[signup]: https://buf.build/signup

[user]: https://buf.build/settings/user
