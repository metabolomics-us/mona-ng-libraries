# Angular MoNA Client

An angular client for the MoNA (MassBank of North America) REST API.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

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
import { Spectrum, SpectrumService } from '@wcmc/ng-mona-client';
 
@Component({
  // ..
})
export class AppComponent {
  constructor(private spectrumService: SpectrumService) {
    // empty query, empty text search, 0th page, page size of 1
    this.spectrumService.list('', '', 0, 1)
      .subscribe((spectrum: Spectrum[]) => {
        // return an array containing one spectrum from the search API
      });
    }
  // ..
}
```

### Perform a similarity search
```typescript
import { SimilarityService, SimilaritySearchRequest, SimilaritySearchResult } from '@wcmc/ng-mona-client';

@Component({
  // ..
})
export class AppComponent {

  constructor(private similarityService: SimilarityService) {

    // base similarity request consisting only of a spectrum string
    // spectrum is the only required property, all following parameters are optional
    const request = new SimilaritySearchRequest('100:1 125:25 200:100');

    // add a minimum similarity threshold from 0 to 1 (a value of 0.7 is equivilent ot a score of 700)
    request.minSimilarity = 0.7;

    // filter by precursor m/z
    // only one parameter between precursorToleranceDa and precursorTolerancePPM is required
    // if both a provided precursorToleranceDa is preferred
    request.precursorMZ = 200;
    request.precursorToleranceDa = 0.05;
    request.precursorTolerancePPM = 10;

    // a list of required tags that each hit must contain all of
    request.requiredTags = ['LC-MS'];

    // a list of tags that each hit much match at least one of
    request.filterTags = ['MassBank', 'GNPS', 'HMDB'];

    // option to remove the precursor m/z from the similarity calculations
    // is false by default, and only applies if precursorMZ is also specified
    request.removePrecursorIon = true;

    // option to specify the similarity search algorithm to use, if not provided the default algorithm is used
    request.algorithm = 'COSINE';


    // perform search, limiting the results to the top 10 hits
    service.getSimilarityResults(request, 10)
      .subscribe((hits: SimilaritySearchResult[]) => {
        // return an array of SimilaritySearchResult objects which have two properties:
        //   - hit: matching spectrum object
        //   - score: similarity score of the query to the match
      });
    );
  // ..
}
```