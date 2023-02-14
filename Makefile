SHELL := /usr/bin/env bash -o pipefail

UNAME_OS := $(shell uname -s)

ifeq ($(UNAME_OS),Darwin)
SED_I := sed -i ''
else
SED_I := sed -i
endif

.DEFAULT_GOAL := all

.PHONY: all
all: run

.PHONY: install
install:
	npm install

.PHONY: build
build: install
	rm -rf build
	npm run build

.PHONY: serve
serve: build
	npm run serve

.PHONY: start
start:
	npm run start

.PHONY: run
run: install
	npm run start

.PHONY: update
upgrade:
	npm update

.PHONY: clean
clean:
	git clean -xdf

.PHONY: lint
lint:
	vale docs

.PHONY: ci
ci:
	npm run build:ci

.PHONY: updateversion
updateversion: updatereference
ifndef VERSION
	$(error "VERSION must be set")
endif
	$(SED_I) "s/[0-9].[0-9][0-9]*\.[0-9][0-9]*/$(VERSION)/g" docs/installation.mdx
	$(SED_I) "s/version: \"[0-9].[0-9][0-9]*\.[0-9][0-9]*\"/version: \"$(VERSION)\"/g" docs/ci-cd/github-actions.md
	$(SED_I) "s/version = \"v[0-9].[0-9][0-9]*\.[0-9][0-9]*\"/version = \"v$(VERSION)\"/g" docs/build-systems/bazel.md
	$(SED_I) "s/BUF_VERSION=[0-9].[0-9][0-9]*\.[0-9][0-9]*/BUF_VERSION=$(VERSION)/g" docs/ci-cd/setup.mdx
	$(SED_I) "s/downloadRelease: \"[0-9].[0-9][0-9]*\.[0-9][0-9]*\"/downloadRelease: \"$(VERSION)\"/g" docusaurus.config.js

.PHONY: updatereference
updatereference:
ifndef VERSION
	$(error "VERSION must be set")
endif
	go install github.com/bufbuild/buf/cmd/buf@$(VERSION); \
	buf webpages docs/reference/ --exclude-command "buf completion" --exclude-command "buf ls-files" --slug-prefix reference/cli
