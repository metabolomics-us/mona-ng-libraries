import { Spectrum } from './spectrum.model';

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
