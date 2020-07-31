# MoNA Angular Libraries

This project was contains several shared Angular libraries to be used in MoNA and related projects.  It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

### Build and Deployment

Each library can be built individually.  For example, `ng-mona-client` can be built using:

`ng build ng-mona-client`

To deploy a new version of the library, first ensure you are authenticated using `npm login`.  Then, bump the package version in `projects/ng-mona-client/package.json`.  Next, build the library using the production environment:

`ng build ng-mona-client --prod`

Finally, move to the build directory and publish the package:

```
cd dist/ng-mona-client
npm publish --access public
```

