<p align="center">
  <a href="https://github.com/stevejamesconner/regex-matcher/actions"><img alt="typescript-action status" src="https://github.com/stevejamesconner/regex-matcher/workflows/build-test/badge.svg"></a>
</p>

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

  PASS __tests__/main.test.ts
  ✓ Extracts Number From String (2 ms)
  ✓ Extracts Major Number From Semver (1 ms)
  ✓ Regex Matches Converts to JSON
  ✓ Regex Matches Converts to JSON with Groups

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin feature/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
