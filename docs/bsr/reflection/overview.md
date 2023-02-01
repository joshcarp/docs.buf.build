---
id: overview
title: Overview
---

The Protobuf binary format is compact and efficient, and it has clever features that allow for a
wide variety of schema changes to be both backward- and forward-compatible.

However, it is not possible to make meaningful sense of the data without a schema. Not only is it
not human-friendly, since all fields are identified by an integer instead of a semantic name, but
it also uses a very simple wire format which re-uses various value encoding strategies for
different value types. This means it is not even possible to usefully interpret encoded values
without a schema — for example, one cannot know (with certainty) if a value is a text string, a
binary blob, or a nested message structure.

But there exists a category of systems and use cases where it is necessary or useful to decode the
data at runtime, by a process or user agent that does not have prior (compile-time) knowledge of
the schemas:

1. **RPC debugging**. It is useful for a human to be able to meaningfully interpret/examine/modify
   RPC requests and responses (with tools like tcpdump, Wireshark, or Charles proxy). But without
   the schema, these payloads are inscrutable byte sequences.
2. **Persistent store debugging** (includes message queues): This is similar to the above use case,
   but the human is looking at data blobs in a database or durable queue. A key difference between
   this case and the one above is that it is likely to observe messages produced over a longer
   period of time, using many versions of the schema as it evolved over time.
3. **Data pipeline schemas and transformations**: This is less for human interaction and more for
   data validation and transformation. A producer may be pushing binary blobs of encoded protos
   into a queue or publish/subscribe system. The system may want to verify that the blob is
   actually valid for the expected type of data, which requires a schema. The consumer may need
   the data in an alternate format; the only way to transform the binary data into an alternate
   format is to have the schema. Further, the only way to avoid dropping data is to have a version
   of the schema that is no older than the version used by the publisher. (Otherwise, newly added
   fields may not be recognized and then silently dropped during a format transformation.)

All of these cases call for a mechanism by which the schema for a particular message type can be
downloaded on demand, for interpreting the binary data.

The [Buf Reflection API](https://buf.build/bufbuild/reflect) provides exactly that mechanism.
It provides a means of downloading the schema for any module in the BSR, and even any specific
version of a module.

In addition to querying for the schema by module name and version, this API also allows the
caller to signal what part of the schema in which they are interested, such as a specific
message type or a specific service or method. This is used to filter the schema, allowing
the client to ignore parts of a module that it does not need. In many cases, the client only
needs a small subset of the module's schema (espcially for large modules), so this can
greatly reduce the amount of data that a client needs to download.


