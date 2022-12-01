---
id: migrating-from-alpha
title: Migrating from alpha
---

The [remote generation alpha](../../reference/deprecated/remote-generation/overview.mdx)
included a feature called remote code execution, which we now simply refer to as
remote package. This guide walks you through what has changed, and outlines
exactly how to migrate from remote code execution to remote packages.

## Alpha deprecation

We've deprecated the
[remote generation alpha](../../reference/deprecated/remote-generation/overview.mdx), but it
will continue to work until April 30, 2023, at which time you'll need to migrate to remote packages.

## Plugin changes

### Public plugins are now solely maintained by the Buf team

In the alpha, public plugins could be uploaded by individual users with no verification.
This caused a subpar experience for users who discovered plugins on their own, as well
as caused a security headache for some of our customers. All public remote plugins
are now maintained and verified by the Buf team directly.

To see all publicly-available plugins, go to [buf.build/plugins](https://buf.build/plugins).
We think we've covered the vast majority of use cases, however if you find a useful
plugin that should be added, please [file an issue][bufbuild-plugins-issue]!

### Private plugins available for enterprise and team customers

The BSR will still allow you to upload your custom, private plugins. This feature is
already available for our enterprise users, and we'll be rolling this out to our buf.build
users in the coming weeks as a paid feature. [Contact us](mailto:info@buf.build) if you
are interested in working with us!

### Disable plugin uploads

Existing plugins and templates on the [public BSR](https://buf.build) will
remain available, but will be removed at a later date. We take breaking changes
very seriously and want to provide ample opportunity for our valued users to
migrate and request plugins which have not yet been added.

## Templates removed

Templates were a complex concept for users to understand when interacting with
the BSR, so we removed them. Instead, you reference plugins directly by name
(and plugins can depend on the output of other plugins). A list of publicly-available
plugins can be found at [buf.build/plugins](https://buf.build/plugins). Note that
not all plugins can be used with Remote Packages - check the individual plugin
for more details.

## Versioning

The synthetic versioning scheme has been replaced by a more explicit versioning
scheme comprised of the plugin version, module reference (datetime+short commit
name) and revision. Example:

```
0.4.0-20220908151351-622fe7149695.1
```

This new semver-compatible versioning scheme can be pinned in lock files and
always references a specific plugin + module for reproducibility.

Most users fetch the `@latest` version and will be unaffected by the versioning
change.

## Go module proxy

There are a couple of key changes from the alpha:

- The base URL has changed from `go.buf.build` to `buf.build/gen/go`.
- The path has changed to begin with the module name.
- The template reference in the path has been replaced with plugins and moved to the end.
- The version has changed to include plugin version and module commit information.

The new format is:

`buf.build/gen/go/{moduleOwner}/{moduleName}/{pluginOwner}/{pluginName}`

```diff
- go.buf.build/protocolbuffers/go/acme/petapis
+ buf.build/gen/go/acme/petapis/protocolbuffers/go
```

This means you'll need to search and replace the old import path with the new
one and run `go mod tidy`.

The versioning has also changed to a more descriptive form:

`{pluginVersion}-{moduleCommitTimestamp}-{moduleCommitName}.{pluginRevision}`

Instead of relying on the commit sequence it now relies directly on commits. For
ways to pin to a commit and other documentation please see the new [Go
proxy][go-proxy] docs.

### connect-go template

If you've used the [connect-go template][bsr-template-connect-go] you'll need to
update all **connect** imports to the generated code of the connect plugin.

The `go.mod` will now require two different imports, one for the
[`go`][bsr-plugin-go] plugin and the other for the
[`connect-go`][bsr-plugin-connect-go] plugin.

```diff title=go.mod
- go.buf.build/bufbuild/connect-go/acme/petapis
+ buf.build/gen/go/acme/petapis/protocolbuffers/go
+ buf.build/gen/go/acme/petapis/bufbuild/connect-go
```

Example:

```diff
package main

import (
-  petv1 "go.buf.build/bufbuild/connect-go/acme/petapis/pet/v1"
-  petv1connect "go.buf.build/bufbuild/connect-go/acme/petapis/pet/v1/petv1connect"
+  petv1 "buf.build/gen/go/acme/petapis/protocolbuffers/go/pet/v1"
+  petv1connect "buf.build/gen/go/acme/petapis/bufbuild/connect-go/pet/v1/petv1connect"
)
```

### grpc-go template

If you've used the [`grpc-go` template][bsr-template-grpc-go] you'll need to
update all **grpc** imports to the generated code of the grpc plugin.

The `go.mod` will now require two different imports, one for the
[`go`][bsr-plugin-go] plugin and the other for the
[`grpc-go`][bsr-plugin-grpc-go] plugin.

```diff title=go.mod
- go.buf.build/grpc/go/acme/petapis
+ buf.build/gen/go/acme/petapis/protocolbuffers/go
+ buf.build/gen/go/acme/petapis/grpc/go
```

We patched the [`grpc-go`][bsr-plugin-grpc-go] plugin to generate code to a sub
package. Earlier it used to generate code to the same package as the
[`go`][bsr-plugin-go] plugin. The new import path is a subpackage that is named
in the format: `{goPackageName}grpc`

Example:

```diff
package main

import (
-  petv1 "go.buf.build/grpc/go/acme/petapis/pet/v1"
+  petv1 "buf.build/gen/go/acme/petapis/protocolbuffers/go/pet/v1"
+  petv1grpc "buf.build/gen/go/acme/petapis/grpc/go/pet/v1/petv1grpc"
)

func main() {
  ...
-  client := petv1.NewPetStoreServiceClient(conn)
+  client := petv1grpc.NewPetStoreServiceClient(conn)
  res, err := client.GetPet(ctx, &petv1.GetPetRequest{})
  ...
}
```

### protoc-gen-validate plugin

If you've used a custom template that included the
[`protoc-gen-validate`][protoc-gen-validate] plugin as of now there is no direct
migration path. We've taken
[stewardship][protoc-gen-validate-ownership] of protoc-gen-validate from the Envoy
team, and will continue to work to improve it, however protoc-gen-validate generated
code is required to be generated to the same package as protoc-gen-go code, which does
not fit cleanly into the remote packages model. In the meantime, switch to [remote plugins](../remote-plugins/overview.mdx)
using `buf generate`.

## BSR NPM registry

### Base URL

The base URL for the BSR NPM registry has changed, you'll want to update your
`.npmrc`:

```diff
- @buf:registry=https://npm.buf.build
+ @buf:registry=https://buf.build/gen/npm/v1
```

### Naming convention

The naming convention has changed because templates have been removed in favor
of plugins. The new format is:

`{moduleOwner}_{moduleName}.{pluginOwner}_{pluginName}`

Note the dot (`.`) delimiter is used to break up the module and the plugin
components.

This means you'll need to do 2 things:

1. `npm remove` the old package and `npm install` the new package
1. Search and replace application imports

```diff
- npm install @buf/bufbuild_es_bufbuild_eliza
+ npm install @buf/bufbuild_eliza.bufbuild_es
```

New documentation is available at [NPM registry](go.mdx).

### connect-web template

If you consumed [connect-web template][bsr-template-connect-web] you'll need to
update all imports for **base types** within your application code. This plugin
now outputs plugin dependencies, namely [protobuf-es][protobuf-es], into a
separate package.

<details>
  <summary>Show example</summary>
  <div>

### One package (old behavior)

```diff
- node_modules
- └── @buf
-     └── bufbuild_connect-web_bufbuild_eliza
-         ├── buf
-         │   └── connect
-         │       └── demo
-         │           └── eliza
-         │               └── v1
-         │                   ├── eliza_connectweb.d.ts
-         │                   ├── eliza_connectweb.js
-         │                   ├── eliza_pb.d.ts
-         │                   └── eliza_pb.js
-         └── package.json
```

### Two packages (new behavior)

```diff
+ node_modules
+ └── @buf
+     ├── bufbuild_eliza.bufbuild_connect-web
+     │   ├── buf
+     │   │   └── connect
+     │   │       └── demo
+     │   │           └── eliza
+     │   │               └── v1
+     │   │                   ├── eliza_connectweb.d.ts
+     │   │                   └── eliza_connectweb.js
+     │   └── package.json
+     └── bufbuild_eliza.bufbuild_es
+         ├── buf
+         │   └── connect
+         │       └── demo
+         │           └── eliza
+         │               └── v1
+         │                   ├── eliza_pb.d.ts
+         │                   └── eliza_pb.js
+         └── package.json
```

  </div>
</details>

Using this example, if your application code imported `eliza_pb.js` from
`@buf/bufbuild_connect-web_bufbuild_eliza/eliza_connectweb.js` then you'll want
to update that import within your application code to reference the base types
from `@buf/bufbuild_eliza.bufbuild_es/eliza_connectweb.js`. Assuming you
have `npm uninstall` and `npm install` based on the naming change mentioned
above.

[bsr-plugin-connect-go]: https://buf.build/bufbuild/connect-go
[bsr-plugin-go]: https://buf.build/protocolbuffers/go
[bsr-plugin-grpc-go]: https://buf.build/grpc/go
[bsr-template-connect-go]: https://buf.build/bufbuild/templates/connect-go
[bsr-template-connect-web]: https://buf.build/bufbuild/templates/connect-web
[bsr-template-grpc-go]: https://buf.build/grpc/templates/go
[bufbuild-plugins]: https://github.com/bufbuild/plugins
[bufbuild-plugins-issue]: https://github.com/bufbuild/plugins/issues/new/choose
[buf-tag-18]: https://github.com/bufbuild/buf/releases/tag/v1.8.0
[protobuf-es]: https://www.npmjs.com/package/@bufbuild/protoc-gen-es
[protoc-gen-validate]: https://github.com/envoyproxy/protoc-gen-validate
[protoc-gen-validate-ownership]: https://github.com/envoyproxy/protoc-gen-validate/issues/616
[go-proxy]: go#using-go-modules
