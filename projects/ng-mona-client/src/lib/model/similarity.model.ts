import { Spectrum } from './spectrum.model';

/**
 * Request object for similarity searches
 *  - spectrum: spectrum object in standard string format
 *  - minSimilarity: minimum similarity score from 0 to 1
 *  - precursorMZ: precursor mass to filter search results
 *  - precursorToleranceDa: precursor search tolerance in dalton
 *  - precursorTolerancePPM: precursor search tolerance in PPM (Da is preferred over PPM)
 *  - requiredTags: hits must match all of the required tags
 *  - filterTags: hits must match at least one of the filter tags
 */
export class SimilaritySearchRequest {
  spectrum: string;
  minSimilarity?: number;
  precursorMZ?: number;
  precursorToleranceDa?: number;
  precursorTolerancePPM?: number;
  requiredTags?: string[];
  filterTags?: string[];

  constructor(spectrum: string) {
    this.spectrum = spectrum;
  }
}

export class SimilaritySearchResult {
  hit: Spectrum;
  score: number;
}
