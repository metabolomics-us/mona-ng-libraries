# Angular Chemdoodle

A chemical structure visualization component for Angular.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.
## Installation

```shell
npm install @wcmc/ng-chemdoodle --save
```

[ChemDoodle Web Components](https://web.chemdoodle.com) is a required dependency of this library; however, it is not distributed on NPM.  The following shell script can set up ChemDoodle in your project root:

```shell
#!/bin/bash
# downloads relevant ChemDoodle Web Components to avoid redistributing
# https://web.chemdoodle.com/installation/download

# latest ChemDoodle Web Components version at the time of this relase
version="9.2.0"

# create lib directory
mkdir -p lib/ChemDoodleWeb
cd lib

# download and extract library
wget "https://web.chemdoodle.com/downloads/ChemDoodleWeb-${version}.zip"
unzip "ChemDoodleWeb-${version}.zip"

mv "ChemDoodleWeb-${version}"/*.txt "ChemDoodleWeb-${version}"/install/* ChemDoodleWeb

# clean up
rm "ChemDoodleWeb-${version}.zip"
rm -rf "ChemDoodleWeb-${version}"
```

## Usage

### Import the library
```typescript
import { NgChemdoodleModule } from '@wcmc/ng-chemdoodle';
 
@NgModule({
 // ...
 imports: [
   // ...
   NgChemdoodleModule
 ]
})
```

### Add required scripts to the angular configuration
In `angular.json` under `architect.build.options` within your project definition, add the following styles and scripts:

```json
"styles": [
  "./lib/ChemDoodleWeb/ChemDoodleWeb.css"
],
"scripts": [
  "./lib/ChemDoodleWeb/ChemDoodleWeb.js"
]
```

### Use the custom component in your module
The ChemDoodle component must be contained within an element with fixed dimensions and must use a unique id and MOL data:

```html
<div style="width: 400px; height: 400px">
  <div [libChemdoodle]="molData" id="uniqueId"></div>
</div>
```

```typescript 
@Component({
  // ..
})
export class AppComponent {
  molData = 'Molecule Name\n  CHEMDOOD08070920033D 0   0.00000     0.00000     0\n[Insert Comment Here]\n 14 15  0  0  0  0  0  0  0  0  1 V2000\n   -0.3318    2.0000    0.0000   O 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318    1.0000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -1.1980    0.5000    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    0.5342    0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -1.1980   -0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -2.0640    1.0000    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n    1.4804    0.8047    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    0.5342   -0.5000    0.0000   C 0  0  0  1  0  0  0  0  0  0  0  0\n   -2.0640   -1.0000    0.0000   O 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318   -1.0000    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n    2.0640   -0.0000    0.0000   C 0  0  0  2  0  0  0  0  0  0  0  0\n    1.7910    1.7553    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n    1.4804   -0.8047    0.0000   N 0  0  0  1  0  0  0  0  0  0  0  0\n   -0.3318   -2.0000    0.0000   C 0  0  0  4  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  3  2  1  0  0  0  0\n  4  2  1  0  0  0  0\n  3  5  1  0  0  0  0\n  3  6  1  0  0  0  0\n  7  4  1  0  0  0  0\n  4  8  2  0  0  0  0\n  9  5  2  0  0  0  0\n 10  5  1  0  0  0  0\n 10  8  1  0  0  0  0\n  7 11  1  0  0  0  0\n  7 12  1  0  0  0  0\n 13  8  1  0  0  0  0\n 13 11  2  0  0  0  0\n 10 14  1  0  0  0  0\nM  END\n> <DATE>\n07-08-2009\n';
  
  // ..
}
```
