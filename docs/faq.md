---
id: faq
title: FAQ
---

## `googleapis` failure {#googleapis-failure}

You may have recently seen an error similar to the following:

```
Failure: …

You may need to upgrade your googleapis/googleapis dependency.

https://github.com/googleapis/googleapis contains over 3800 files, mostly
relating to Google's core APIs. However, there are only ~30 files used by
99.999% of developers, and these files are the most common dependency in
the Protobuf ecosystem. This hosted module now only includes these specific
files, as including all the files causes hundreds of megabytes of unused
generated code for the vast majority of developers.

…
```

If you're seeing this error, it's possible that you need to upgrade your
`googleapis` dependency - you should be able to run:

```terminal
$ buf mod update
```

If you've pinned your `googleapis/googleapis` dependency, you'll need to remove
the pin prior to `buf mod update`.

Additionally, if you have dependencies that themselves depend on googleapis,
you'll need to update those as well, starting with your upstream modules. See
[Tour - Push workspace modules](tour/push-workspace-modules) for more details.

For context, we recently made a change to our managed
[buf.build/googleapis/googleapis][googleapis] repository.
[googleapis][googleapis-github] contains over 3800 files, mostly relating to
Google's core APIs. This causes numerous issues for most users, such as timeouts
when installing packages with huge swaths of unused code to pull in just a few
files. Not only is this a lot of code over the network and on disk, but it can
cause issues in editors that try to parse all of that code!

However, there are only ~30 files used by 99.999% of developers, and these files
are the most common dependency in the Protobuf ecosystem. For example:

- `google.type`, which defines useful messages such as `DateTime` and `Money`.
- `google.rpc`, for interacting with gRPC.
- `google.api`, for defining APIs, such as with `grpc-gateway`.

We considered these commonly used packages and included a subset of them into
the new, slim googleapis repository.

At Buf, we take breaking changes incredibly seriously. This was done to ensure
the stability of the BSR before we move the BSR out of beta. We apologize for
any disruption this may cause, however we felt this issue was serious enough to
make this change prior to finalizing the BSR beta. We will never break consumers
after v1.

[repo]: https://github.com/bufbuild/buf
[v1]: https://github.com/bufbuild/buf/releases/tag/v1.0.0
[googleapis]: https://buf.build/googleapis/googleapis
[googleapis-github]: https://github.com/googleapis/googleapis

## CLI command or flag warnings

If you're using the [`buf` CLI][repo] and you get an error message saying that a
flag or command has been moved or is no longer supported, the solution is to
upgrade to version [1.0][v1] or greater of the CLI.

Prior to v1.0, we frequently made changes to the CLI, some of them breaking.
With the [1.0 release][v1], we removed all deprecated flags and commands and
established a clean slate. For the future, our policy is to _never_ introduce
breaking changes until v2.0 of the CLI, and we don't intend to ever release a
v2.0.

## `buf.yaml` version

You may have recently seen this warning:

```
Failure: buf.yaml has no version set. Please add "version: v1". See https://docs.buf.build/faq for more details.
```

We have added the concept of version to the configuration. For a given version,
these things don't change:

- Configuration file layout
- Default configuration files
- Lint and breaking change rules and their associated categories.

**Our goal at Buf is to never break users.** You should be able to upgrade
`buf`, and expect the same results, forever. In this spirit, we want to make
sure that upgrading `buf` does not result in any configuration differences, and
does not result in different lint or breaking change results.

There are only a few exceptions to this rule that took place between `v1beta1`
and `v1`. Fortunately, we've rolled out the `buf beta migrate-v1beta1` command
to automatically migrate your configuration for you. For more information on
exactly what changed between `v1beta1` and `v1`, check out the
[migration guide](configuration/v1beta1-migration-guide.md).

We also need to be able to enhance the lint and breaking change functionality,
and improve on the configuration shape as well. To accomplish this, while not
breaking users who have come to rely on the existing shape and rules, we have
added this version. The only currently available versions are `v1beta1` and
`v1`.

**The `v1beta1` version will be supported forever.** This will not be removed
when we hit v1.0. Having a `version` set in your configuration is currently
optional, however we will require having a `version` as of v1.0. This will be
one of the only (if not the only) breaking change between the beta and v1.0.

To prepare for this, and to remove this warning, just add a version to the top
of your [`buf.yaml`](configuration/v1/buf-yaml.md):

```yaml title="buf.yaml"
version: v1
```

Here's a one-liner for that:

```terminal
$ cat <(echo version: v1) buf.yaml > buf.yaml.tmp && mv buf.yaml.tmp buf.yaml
```

A version can (and should) also be added to the protoc plugin options. For
example:

```terminal
$ protoc -I . \
  --buf-lint_out=. \
  '--buf-lint_opt={"input_config":{"version":"v1","lint":{"use":["ENUM_NO_ALLOW_ALIAS"]}}}' \
  $(find . -name '*.proto')
```

We apologize for any inconvenience this warning may have caused.
