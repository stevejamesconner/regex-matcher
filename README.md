[![build-test](https://github.com/stevejamesconner/regex-matcher/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/stevejamesconner/regex-matcher/actions/workflows/test.yml)
[![CodeQL](https://github.com/stevejamesconner/regex-matcher/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/stevejamesconner/regex-matcher/actions/workflows/codeql-analysis.yml)

This Action allows for regular expression parsing and returns matches and match groups for use in downstream steps.
This Action does not support named groups.

## Inputs

| NAME    | DESCRIPTION                                              |   TYPE   | REQUIRED | DEFAULT |
|---------|----------------------------------------------------------| -------- | -------- |---------|
| `regex` | A regular expression, supports groups.                   | `string` | `true`   | `N/A`   |
| `data`  | The data string to evaluate the expression against.      | `string` | `true`   | `N/A`   |
| `flags` | Regex flags. https://javascript.info/regexp-introduction | `string` | `false`  | `'g'`   |

## Outputs

| NAME         | DESCRIPTION                                                                                 |   TYPE   |
|--------------|---------------------------------------------------------------------------------------------| -------- |
| `m1`         | The first match or an empty string if no matches.                                           | `string` |
| `m1g1`       | First match first group or an empty string.                                                 | `string` |
| `m1g2`       | First match second group or an empty string.                                                | `string` |
| `m1g3`       | First match third group or an empty string.                                                 | `string` |
| `m2`         | The second match or an empty string if no matches.                                          | `string` |
| `m2g1`       | Second match first group or an empty string.                                                | `string` |
| `m2g2`       | Second match second group or an empty string.                                               | `string` |
| `m2g3`       | Second match third group or an empty string.                                                | `string` |
| `m3`         | The third match or an empty string if no matches.                                           | `string` |
| `m3g1`       | Third match first group or an empty string.                                                 | `string` |
| `m3g2`       | Third match second group or an empty string.                                                | `string` |
| `m3g3`       | Third match third group or an empty string.                                                 | `string` |
| `allMatches` | JSON array data, as a string, representing the entire match set returned by the expression. | `string` |

## Examples

```yaml
name: 'Simple Regex Extract'
on:
  pull_request:
  push:

jobs:
  extract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set Node.js 16.x
        uses: actions/setup-node@v3.5.1
        with:
          node-version: 16.x

      - name: Extract Numeric Version From Branch
        uses: stevejamesconner/regex-matcher@v1.0.0
        id: extractBranchVersion
        with:
          regex: '\d+'
          data: 'v1/develop'

      - name: Fail If Regex Extraction Is Empty
        if: ${{ steps.extractBranchVersion.outputs.m1 == '' }}
        uses: actions/github-script@v3
        with:
          script: core.setFailed('Extracted regex was not present in the output!')

      - name: Dump Regex Extractions
        shell: bash
        run: |
          echo ${{ steps.extractBranchVersion.outputs.m1 }}
          echo ${{ steps.extractBranchVersion.outputs.allMatches }}
```

```yaml
name: 'Grouped Regex Extract'
on:
  pull_request:
  push:

jobs:
  extract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set Node.js 16.x
        uses: actions/setup-node@v3.5.1
        with:
          node-version: 16.x

      - name: Extract Major And Minor From Semver
        uses: stevejamesconner/regex-matcher@v1.0.0
        id: extractSemanticVersion
        with:
          regex: '(\d+).'
          data: '2.3.4'

      - name: Fail If Regex Extraction Is Empty
        if: ${{ steps.extractSemanticVersion.outputs.m1 == '' && steps.extractSemanticVersion.outputs.m2 == '' }}
        uses: actions/github-script@v3
        with:
          script: core.setFailed('Extracted regex was not present in the output!')

      - name: Dump Regex Extractions
        shell: bash
        run: |
          echo ${{ steps.extractSemanticVersion.outputs.m1 }}
          echo ${{ steps.extractSemanticVersion.outputs.m1g1 }}
          echo ${{ steps.extractSemanticVersion.outputs.m2 }}
          echo ${{ steps.extractSemanticVersion.outputs.m2g1 }}
          echo ${{ steps.extractSemanticVersion.outputs.allMatches }
```
