# Angular MoNA Client

An angular client for the MoNA (MassBank of North America) REST API.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Installation

```shell
npm install @wcmc/ng-mona-client --save
```

## Usage

### Import the library
```typescript
import { NgMonaClientModule } from '@wcmc/ng-mona-client';
 
@NgModule({
 // ...
 imports: [
   // ...
   NgMonaClientModule
 ]
})
```

### Inject a REST service and model into your component/service/etc
```typescript
import { Spectrum, SpectrumService } from 'ng-mona-client';
 
@Component({
  // ..
})
export class AppComponent {
  constructor(private spectrumService: SpectrumService) {
    // empty query, empty text search, 0th page, page size of 1
    this.spectrumService.list('', '', 0, 1)
      .subscribe(spectrum => {
        // returns the first spectrum from the search API
      });
    }
  // ..
}
```
