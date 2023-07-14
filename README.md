# MoNA Angular Libraries

This project was contains several shared Angular libraries to be used in MoNA and related projects.  It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

2021/04/21: ng-mass-spec-plotter has been upgraded to Angular v10.

2023/07/14: In the process of updating all to Angular >= v15.

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

### Testing

To run tests for each project, use `ng test` and the project name. For example:
```
ng test ng-mona-client
```

