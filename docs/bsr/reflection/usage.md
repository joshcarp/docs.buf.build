---
id: usage
title: Usage
---

## API Usage

The Buf Reflection API can be found in the public BSR: [buf.build/bufbuild/reflect](https://buf.build/bufbuild/reflect)
(sources are in [GitHub](https://github.com/bufbuild/reflect)). You can see the available
remote packages for it [here](https://buf.build/bufbuild/reflect/assets/main).

It contains a single RPC service: `buf.reflect.v1beta1.FileDescriptorSetService`. This service
contains a single endpoint named `GetFileDescriptorSet`, which is for downloading the schema
for a particular module (optionally, at a specific version). The response is in the
form of a [`FileDescriptorSet`](https://github.com/protocolbuffers/protobuf/blob/v21.0/src/google/protobuf/descriptor.proto#L55-L59).
You can find reference documentation for all the request and response fields
[in the BSR](https://buf.build/bufbuild/reflect/docs/main:buf.reflect.v1beta1#buf.reflect.v1beta1.FileDescriptorSetService).

:::note
For the general mechanics of how to use APIs exposed by the BSR, see
[API Access](/bsr/api-access.md).
:::

The endpoint accepts a module name, in `<bsr-domain>/<owner>/<repo>` format. For example,
`buf.build/bufbuild/eliza` is the module name for the Eliza service (a demo service for
[Connect](https://connect.build)). The domain of the BSR is "buf.build" (the public BSR);
the owner is the "bufbuild" organization; and the repo name is "eliza".

Here's an example API request for downloading the [`buf.build/bufbuild/eliza`](https://buf.build/bufbuild/eliza)
module:
```
> POST /buf.reflect.v1beta1.FileDescriptorSetService/GetFileDescriptorSet HTTP/1.1
> Host: api.buf.build
> Authorization: Bearer <insert-buf-token-here>
> Content-Type: application/json
> Connect-Protocol-Version: 1
>
> {"module": "buf.build/bufbuild/eliza"}
```
Assuming a valid BSR token is used in the `Authorization` header, this will return a
`FileDescriptorSet` that describes the files in the requested module, which describe
the Eliza RPC service and all related message types.

The above request does not contain a `version` field in the request, which means it will
return the latest version. This is the same as asking for `"version": "main"`, which also
returns the latest version. The version can also refer to a [commit](https://buf.build/bufbuild/eliza/commits/main),
either via the commit name or an associated tag. Or the version can refer to the name of a
[draft](/bsr/overview#referencing-a-module).

:::note
These are the same ways one can pin a particular version in the `deps` section of
a `buf.yaml` file.

See the [Overview](/bsr/overview#dependencies) section on dependencies for more.
:::

## Filtering the Schema

The request may also include a field named `symbols` that is an array of fully-qualified
names. If present and non-empty, the returned schema will be pruned to only include the
data required to describe the requested symbols. All other content in the module will be
omitted. This is particularly useful with large modules, to reduce the amount of schema
data that a client needs to download. For example, let's say a client needs the schema for
a single service, but it's defined in a large module that defines _many_ services. The
request can indicate the name of the service of interest in the `symbols` field and will
get back only what they need and nothing else. Here's an example that returns only the
`google.longrunning.Operations` service from the [`buf.build/googleapis/googleapis`](https://buf.build/googleapis/googleapis)
module:
```
> POST /buf.reflect.v1beta1.FileDescriptorSetService/GetFileDescriptorSet HTTP/1.1
> Host: api.buf.build
> Authorization: Bearer <insert-buf-token-here>
> Content-Type: application/json
> Connect-Protocol-Version: 1
>
> {
>    "module": "buf.build/googleapis/googleapis",
>    "version": "75b4300737fb4efca0831636be94e517",
>    "symbols": ["google.longrunning.Operations"]
> }
```
This currently returns a response that is about 11k. If we leave out the `symbols`
field from the request, the response would be about 10x that size.

## Dynamic Messages

Once you have downloaded a set of descriptors, the next step is what to do with it.
Having the whole schema allows for building dynamic messages -- which are backed by a
descriptor at runtime instead of by generated code.

The general shape of this solution is two-fold:
1. Convert `FileDescriptorProto` instances to "rich" data structures that are
   cross-linked and indexed. This makes it easy to traverse type references in the
   schema. This process also validates the schema, to make sure it is not missing
   any necessary elements and is valid per the rules of the Protobuf language.
2. Use a "rich" descriptor that describes a message to construct a _dynamic_ message.
   This message acts on most ways like a regular generated message. You can unmarshal
   message data from an array of bytes or vice versa, marshal the message's data to
   bytes. You can examine the field values of the message, too. Since it is not a
   generated type, however, you can't access fields in the normal way since your
   code doesn't even know what fields the message has at compile-time.

The power of a dynamic message is that it enables an "appliance" that can process
message data of arbitrary types in cross-cutting ways. A particularly powerful and
common use case is to examine fields and field options to redact sensitive data/PII,
convert to JSON, and then store in a data warehouse for use with business intelligence
tools. _Without_ a dynamic message, you have to write a bespoke message processor
that must be recompiled and re-deployed whenever any of the message definitions are
changed. _With_ a dynamic message, you can compile and deploy the service once, but
then must provide the service with updated message definitions as they change; that's
where the BSR and the Buf Reflect API come in!

To get a sense of how the API can be used to perform functionality described in the
above paragraph, take a look at our example [client library](/bsr/reflection/prototransform.md).

Unfortunately, not all languages/runtimes have support for descriptors and dynamic messages.
Here are ones that do, with links to relevant API documentation.

* C++
   * [Descriptors](https://protobuf.dev/reference/cpp/api-docs/google.protobuf.descriptor/)
   * [Dynamic Messages](https://protobuf.dev/reference/cpp/api-docs/google.protobuf.dynamic_message/)
* Go
   * [Descriptors](https://pkg.go.dev/google.golang.org/protobuf/reflect/protoreflect)
   * [Dynamic Messages](https://pkg.go.dev/google.golang.org/protobuf/types/dynamicpb)
* Java
   * [Descriptors](https://protobuf.dev/reference/java/api-docs/com/google/protobuf/Descriptors.html)
   * [Dynamic Messages](https://protobuf.dev/reference/java/api-docs/com/google/protobuf/DynamicMessage.html)
* Python
    * [Descriptors](https://googleapis.dev/python/protobuf/latest/google/protobuf/descriptor_pool.html)
    * [Dynamic Messages](https://googleapis.dev/python/protobuf/latest/google/protobuf/message_factory.html)

There are other languages (C#, PHP) that include some support for descriptors, but only for
runtime reflection; they do not provide dynamic message support. There also may be third-party
language runtimes that offer this support.