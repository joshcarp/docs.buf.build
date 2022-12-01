---
id: migrating-from-alpha
title: Migrating from alpha
---

The
[remote generation alpha](../../reference/deprecated/remote-generation/overview.mdx)
included a feature called remote plugin execution, which we now simply refer to
as remote plugins. Usage is extremely similar, however there are a few callouts
to be aware of.

## buf.gen.yaml changes

The buf.gen.yaml configuration file is largely unchanged, except for:

1. `name` and `remote` keys to reference plugins changed to just `plugin`. The
   `plugin` key understands both local and remote references. Requires [buf CLI
   version 1.8][buf-tag-18] or later.
1. Drop the `/plugins/` path when referencing remote plugins

Full example covering both changes:

```diff
plugins:
-  - remote: buf.build/bufbuild/plugins/connect-go
+  - plugin: buf.build/bufbuild/connect-go
```

## Public plugins are now solely maintained by the Buf team

In the alpha, public plugins could be uploaded by individual users with no
verification. This caused a subpar experience for users who discovered plugins
on their own, as well as caused a security headache for some of our customers.
All public remote plugins are now maintained and verified by the Buf team
directly.

To see all publicly-available plugins, go to
[buf.build/plugins](https://buf.build/plugins). We think we've covered the vast
majority of use cases, however if you find a useful plugin that should be added,
please [file an issue][bufbuild-plugins-issue]!

## Private plugins available for enterprise and team customers

The BSR will still allow you to upload your custom, private plugins. This
feature is already available for our enterprise users, and we'll be rolling this
out to our buf.build users in the coming weeks as a paid feature.
[Contact us](mailto:info@buf.build) if you are interested in working with us!

## Alpha deprecation

We've deprecated the
[remote generation alpha](../../reference/deprecated/remote-generation/overview.mdx),
but it will continue to work until April 30, 2023, at which time you'll need to
migrate to remote plugins or [remote packages](../remote-packages/overview.mdx).

[bufbuild-plugins-issue]: https://github.com/bufbuild/plugins/issues/new/choose
[buf-tag-18]: https://github.com/bufbuild/buf/releases/tag/v1.8.0
