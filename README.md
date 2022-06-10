# version-upgrad

A github action that makes sure that git tag and version in package.json match

# Usage

You can safeguard that your package.json and your git tag matches using this action and proceed to release after the check successfully ran.

```yaml
name: Release

on:
  push:
    tags:
      - "*"

jobs:
  setup:
    name: Setup
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: version-upgrad
        id: version-upgrad
        uses: skbhat199/version-upgrad@0.0.1
        with:
          TAG_PREFIX: v # Optional, default prefix is ""
          # TAG_PREFIX may also be defined under the 'env' key.
```

The action outputs package.json version as `PACKAGE_VERSION` and the tag (without 'refs/tags/') as `TAG_VERSION`.  
Eg. use it as `steps.version-upgrad.outputs.PACKAGE_VERSION` in other steps.
