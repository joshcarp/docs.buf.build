// @ts-check

const sidebars = {
    docs: [
        {
            type: "doc",
            label: "Introduction",
            id: "introduction",
        },
        {
            type: "category",
            label: "Quick Start",
            items: [
                {
                    type: "doc",
                    id: "installation",
                    label: "Buf CLI"
                },
                {
                    type: "link",
                    label: "Buf Schema Registry (BSR)",
                    href: "https://buf.build/signup"
                },
                {
                    type: "link",
                    label: "Connect",
                    href: "https://connect.build"
                }
            ],
            collapsed: false,
        },
        {
            type: "category",
            label: "Guides",
            items: [
                {
                    type: "category",
                    label: "Getting Started",
                    items: [
                        "tutorials/getting-started-with-buf-cli",
                        "tutorials/getting-started-with-bsr",
                    ],
                    collapsed: false
                },
                {
                    type: "category",
                    label: "How To",
                    items: [
                        "how-to/replace-protoc-with-buf",
                        "how-to/iterate-on-modules",
                        "how-to/migrate-from-protolock",
                        "how-to/migrate-from-prototool"
                    ],
                    collapsed: true
                },
                {
                    type: "category",
                    label: "Best Practices",
                    items: [
                        "best-practices/style-guide",
                        "best-practices/module-development"
                    ],
                    collapsed: true
                },
            ],
            collapsed: false
        },
        {
            type: "category",
            label: "Manuals",
            items: [
                {
                    type: "category",
                    label: "The Buf CLI",
                    items: [

                        {
                            type: "category",
                            label: "Build",
                            items: ["build/usage"],
                            collapsed: false
                        },
                        {
                            type: "category",
                            label: "Generate",
                            items: [
                                "generate/usage",
                                "generate/managed-mode",
                            ],
                            collapsed: false
                        },
                        {
                            type: "category",
                            label: "Lint",
                            items: [
                                "lint/overview",
                                "lint/usage",
                                "lint/configuration",
                                "lint/rules"
                            ],
                            collapsed: false
                        },
                        {
                            type: "category",
                            label: "Breaking Change Detection",
                            items: [
                                "breaking/overview",
                                "breaking/usage",
                                "breaking/configuration",
                                "breaking/rules"
                            ],
                            collapsed: false
                        },
                        {
                            type: "category",
                            label: "Format",
                            items: ["format/usage", "format/style"],
                            collapsed: false
                        },
                        {
                            type: "category",
                            label: "Invoking RPCs",
                            items: ["curl/usage"],
                            collapsed: false
                        },
                    ],
                    collapsed: false
                },
                {
                    type: "category",
                    label: "The Buf Schema Registry (BSR)",
                    items: [
                        "bsr/introduction",
                        "bsr/overview",
                        "bsr/authentication",
                        "bsr/usage",
                        "bsr/api-access",
                        {
                            type: "category",
                            label: "Reflection",
                            items: [
                                "bsr/reflection/overview",
                                "bsr/reflection/usage",
                                "bsr/reflection/prototransform",
                            ],
                            customProps: {
                                badge: {
                                    label: "new",
                                    severity: "info"
                                }
                            },
                            collapsed: false
                        },
                        "bsr/documentation",
                        "bsr/user-management",
                        {
                            type: "doc",
                            id: "bsr/studio",
                            customProps: {
                                badge: {
                                    label: "beta",
                                    severity: "info"
                                }
                            }
                        },
                        {
                            type: "category",
                            label: "Remote Plugins",
                            items: [
                                "bsr/remote-plugins/overview",
                                "bsr/remote-plugins/usage",
                                "bsr/remote-plugins/migrating-from-alpha",
                            ],
                            customProps: {
                                badge: {
                                    label: "new",
                                    severity: "info"
                                }
                            },
                            collapsed: false
                        },
                        {
                            type: "category",
                            label: "Remote Packages",
                            items: [
                                "bsr/remote-packages/overview",
                                "bsr/remote-packages/go",
                                "bsr/remote-packages/npm",
                                "bsr/remote-packages/migrating-from-alpha"
                            ],
                            customProps: {
                                badge: {
                                    label: "new",
                                    severity: "info"
                                }
                            },
                            collapsed: false
                        }
                    ],
                    collapsed: false
                },
                {
                    type: "category",
                    label: "CI/CD",
                    items: ["ci-cd/setup", "ci-cd/github-actions"],
                    collapsed: true
                },
                {
                    type: "category",
                    label: "Build systems",
                    items: ["build-systems/bazel"],
                    collapsed: true
                },
            ],
            collapsed: false
        },
        {
            type: "category",
            label: "Reference",
            items: [
                {
                    type: "category",
                    label: "Buf CLI",
                    collapsed: true,
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference/buf',
                        },
                    ]
                },
                {
                    type: "category",
                    label: "Configuration",
                    items: [
                        "configuration/overview",
                        "configuration/v1beta1-migration-guide",
                        {
                            type: "category",
                            label: "v1",
                            items: [
                                "configuration/v1/buf-yaml",
                                "configuration/v1/buf-lock",
                                "configuration/v1/buf-gen-yaml",
                                "configuration/v1/buf-work-yaml"
                            ],
                            collapsed: false
                        },
                        {
                            type: "category",
                            label: "v1beta1",
                            items: [
                                "configuration/v1beta1/buf-yaml",
                                "configuration/v1beta1/buf-lock",
                                "configuration/v1beta1/buf-gen-yaml",
                                "configuration/v1beta1/lint-rules"
                            ],
                            collapsed: true
                        }
                    ],
                    collapsed: true
                },
                "reference/workspaces",
                "reference/images",
                "reference/inputs",
                "reference/internal-compiler",
                "reference/protoc-plugins",
                {
                    type: "category",
                    label: "Deprecated",
                    items: [
                        {
                            type: "category",
                            label: "Remote generation",
                            customProps: {
                                badge: {
                                    label: "alpha",
                                    severity: "info"
                                }
                            },
                            items: [
                                "reference/deprecated/remote-generation/overview",
                                "reference/deprecated/remote-generation/go",
                                "reference/deprecated/remote-generation/js",
                                "reference/deprecated/remote-generation/plugin-example",
                                "reference/deprecated/remote-generation/template-example"
                            ],
                            collapsed: false
                        }
                    ],
                    collapsed: true
                }
            ],
            collapsed: false
        },
        "editor-integration",
        "faq",
        "contact"
    ]
};

module.exports = sidebars;
