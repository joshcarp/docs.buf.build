---
id: overview
title: Overview
---

Bazel rules for `buf` are available at the [rules_buf](https://github.com/bufbuild/rules_buf) repo. 
It currently supports:
* [Lint](/lint/overview) and [breaking change detection](/breaking/overview) 
as [test rules](https://docs.bazel.build/versions/main/skylark/rules.html#executable-rules-and-test-rules).
* `buf` as a [toolchain](https://docs.bazel.build/versions/main/toolchains.html).
* [Gazelle](https://github.com/bazelbuild/bazel-gazelle) extension to generate the rules.

## Setup

Add snippets below to the `WORKSPACE` file replacing the `<SHA256>` and `<VERSION>` with those of a [specific release](https://github.com/bufbuild/rules_buf/releases):
```starlark title="WORKSPACE"
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "rules_buf",
    sha256 = "<SHA256>",
    urls = [        
        "https://github.com/bufbuild/rules_buf/releases/download/<VERSION>/rules_buf-<VERSION>.zip",
    ],
)

load("@rules_buf//buf:repositories.bzl", "rules_buf_dependencies", "rules_buf_toolchains")

rules_buf_dependencies()

rules_buf_toolchains()

# rules_proto
load("@rules_proto//proto:repositories.bzl", "rules_proto_dependencies", "rules_proto_toolchains")

rules_proto_dependencies()

rules_proto_toolchains()
```
> `rules_proto` is required and is loaded as part of `rules_buf_dependencies`.
> To use a specific version of `rules_proto` load it before `rules_buf`

## Rules

The rules work alongside `proto_library` rules. All the rules are configured using the `buf.yaml` file. 

Export the `buf.yaml` using `exports_files(["buf.yaml"])` to reference it. For repositories that contain a `buf.work.yaml` that references to multiple `buf.yaml` files, this has to be done for each `buf.yaml` file independently.

> We highly recommend using the [gazelle extension](gazelle) to generate these rules.

### `buf_lint_test`

`buf_lint_test` is a test rule that lints one or more `proto_library` targets.

#### Example

```starlark
load("@rules_buf//buf:defs.bzl", "buf_lint_test")
load("@rules_proto//proto:defs.bzl", "proto_library")

proto_library(
    name = "foo_proto",
    srcs = ["pet.proto"],
    deps = ["@go_googleapis//google/type:datetime_proto"],
)

buf_lint_test(
    name = "foo_proto_lint",    
    targets = [":foo_proto"],
    config = "buf.yaml",
)
```

This can be run as:

```terminal
$ bazel test :foo_proto_lint
```

We recommend having a single `buf_lint_test` for each `proto_library` target. The gazelle [extension](gazelle) can generate them in the same pattern.

#### Attributes
[//]: # (The table is copied from documentation generated by stardoc: https://github.com/bufbuild/rules_buf/blob/main/buf/README.md )

| Name                                      | Description                                | Type                                                                        | Mandatory | Default |
|:------------------------------------------|:-------------------------------------------|:----------------------------------------------------------------------------|:----------|:--------|
| <a id="buf_lint_test-name"></a>name       | A unique name for this target.             | <a href="https://bazel.build/docs/build-ref.html#name">Name</a>             | required  |         |
| <a id="buf_lint_test-config"></a>config   | The <code>buf.yaml</code> file.            | <a href="https://bazel.build/docs/build-ref.html#labels">Label</a>          | optional  | None    |
| <a id="buf_lint_test-targets"></a>targets | <code>proto_library</code> targets to lint | <a href="https://bazel.build/docs/build-ref.html#labels">List of labels</a> | required  |         |

### `buf_breaking_test`

`buf_breaking_test` is a test rule that checks one or more `proto_library` targets for breaking changes. It requires a [Buf image](/reference/images) file to check against.

#### Example

```starlark
load("@rules_buf//buf:defs.bzl", "buf_breaking_test")
load("@rules_proto//proto:defs.bzl", "proto_library")

proto_library(
    name = "foo_proto",
    srcs = ["foo.proto"],
)

buf_breaking_test(
    name = "foo_proto_breaking",
    # Image file to check against.
    against = "//:image.bin",
    targets = [":foo_proto"],
    config = ":buf.yaml",
)
```

This can be run as:

```terminal
$ bazel test :foo_proto_breaking
```

We recommend having a single `buf_breaking_test` for each buf module. For repositories that contain a `buf.work.yaml` that references multiple `buf.yaml` files, there needs to be exactly one `buf_breaking_test` for each `buf.yaml` file.

Alternatively, a single `buf_breaking_test` can be used against each `proto_library` target. For this to work, `limit_to_input_files` attribute must be set to `True` as the against Buf image file may contain other Protobuf files. Although this is closer to how bazel operates, for this particular use case it is not recommended. This [section](gazelle#example-module-vs-package-mode) explains the differences with an example.

The gazelle [extension](gazelle) can generate `buf_breaking_test` in either levels of granularity.

#### Against image

The Buf image file can be generated using:

```terminal
$ buf build --exclude-imports -o image.bin <input>
```

`<input>` can be the path to a buf module among [others](/reference/inputs).

We recommend storing the resulting Buf image file in a `testdata` directory and checking it in to version control. It should be updated as needed. In the case of repositories that follow a versioning scheme such as [semver](https://semver.org/). It can be updated on each new release either manually or a post release hook.

As an alternative to checking in the image file, CI artifacts can be used. Many CI servers like [Travis CI](https://travis-ci.com/) have the ability to upload build artifacts to a backend like [S3](https://aws.amazon.com/s3/). A pipeline can be setup to build the images as CI artifacts on each commit. These artifacts can be added to the `WORKSPACE`:

```starlark title="WORKSPACE"
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_file")

# Assuming your using s3 and bucket is at http://s3-us-east-1.amazonaws.com/bucket/foo/bar 
# and COMMIT is a variable storing the commit to compare against
http_file(
      name = "buf_module",
      urls = ["http://s3-us-east-1.amazonaws.com/bucket/foo/bar/images/${COMMIT}/image.bin"],
      sha256 = "...",
)
``` 

This file can be referenced from `buf_breaking_test`. The commit and sha256 need to be updated as needed.

> For repositories using `buf.work.yaml` that reference multiple `buf.yaml` files. A single Buf image file should be maintained for each `buf.yaml` file. This is true for both module and package level granularity of `buf_breaking_test`.

#### Attributes
[//]: # (The table is copied from documentation generated by stardoc: https://github.com/bufbuild/rules_buf/blob/main/buf/README.md )

| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="buf_breaking_test-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/docs/build-ref.html#name">Name</a> | required |  |
| <a id="buf_breaking_test-against"></a>against |  The image file to check against.  | <a href="https://bazel.build/docs/build-ref.html#labels">Label</a> | required |  |
| <a id="buf_breaking_test-config"></a>config |  The <code>buf.yaml</code> file.   | <a href="https://bazel.build/docs/build-ref.html#labels">Label</a> | optional | None |
| <a id="buf_breaking_test-exclude_imports"></a>exclude_imports |  Exclude imports from breaking change detection.   | Boolean | optional | False |
| <a id="buf_breaking_test-limit_to_input_files"></a>limit_to_input_files |  Only run breaking checks against the files in the targets. This has the effect of filtering the against image to only contain the files in the input.   | Boolean | optional | True |
| <a id="buf_breaking_test-targets"></a>targets |  <code>proto_library</code> targets to check for breaking changes   | <a href="https://bazel.build/docs/build-ref.html#labels">List of labels</a> | optional | [] |


## Toolchains

The `buf` tool is packaged as a [toolchain](https://docs.bazel.build/versions/main/toolchains.html). It can be used to create custom rules that depend on `buf`.

#### Example

```starlark
def _buf_ls_files_impl(ctx):
    buf = ctx.toolchains["@rules_buf//tools/buf:toolchain_type"].cli
    ...
    ctx.actions.run(
        ...
        arguments = ["ls-files"],
        executable = buf,
    )

buf_ls_files = rule(
    implementation = _buf_ls_files_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = True),  
        ...      
    },
    toolchains = ["@rules_buf//tools/buf:toolchain_type"]
)
```
