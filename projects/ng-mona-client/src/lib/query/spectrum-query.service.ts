import { Injectable } from '@angular/core';

import { RSQLBuilderService } from './rsql-builder.service';
import { MetaDataQueryTerm, NameQueryTerm, NumericMetaDataQueryTerm, QueryTerm, SPLASHQueryTerm, SubmitterQueryTerm, TagQueryTerm } from './query-term.model';
import { QueryTermService } from './query-term.service';

@Injectable({
  providedIn: 'root'
})
export class SpectrumQueryService {

  queryTerms: QueryTerm[];
  query: string;
  textSearch: string;

  private rsqlQuery: string;
  private updatedQuery: boolean;

  constructor(private rsqlBuilderService: RSQLBuilderService, private queryTermService: QueryTermService) {
    this.resetQuery();
  }

  /**
   * reset current query
   */
  resetQuery() {
    console.log('Reseting query');

    this.queryTerms = [];
    this.query = undefined;
    this.textSearch = undefined;

    this.rsqlQuery = undefined;
    this.updatedQuery = true;
  }

  /**
   * build query components into an RSQL query string
   */
  buildRSQLQuery(): string {
    // update RSQL query only when needed
    if (this.updatedQuery) {
      this.rsqlQuery = this.rsqlBuilderService.buildRSQLFromQueryTerms(this.queryTerms);
      this.updatedQuery = false;
    }

    if (this.query && this.query !== '') {
      return `${this.rsqlQuery} and ${this.query}`;
    } else {
      return this.rsqlQuery;
    }
  }

  getQueryTerms(): QueryTerm[] {
    return this.queryTerms;
  }

  setQueryTerms(queryTerms: QueryTerm[]) {
    this.queryTerms = queryTerms;
    this.updatedQuery = true;
  }

  getEncodedQueryTerms(): string[] {
    return this.queryTerms.map(x => this.queryTermService.encode(x));
  }

  setEncodedQueryTerms(queryTerms: string[]) {
    this.queryTerms = queryTerms.map(x => this.queryTermService.decode(x));
    this.updatedQuery = true;
  }

  getQuery(): string {
    return this.query;
  }

  setQuery(query: string) {
    this.query = query;
    this.updatedQuery = true;
  }

  getTextSearch(): string {
    return this.textSearch;
  }

  setTextSearch(textSearch: string) {
    this.textSearch = textSearch;
    this.updatedQuery = true;
  }


  private addToQuery(queryTerm: QueryTerm) {
    this.queryTerms.push(queryTerm);
    this.updatedQuery = true;
  }

  addNameToQuery(name: string, match: string = 'like') {
    this.addToQuery(new NameQueryTerm(name, match));
  }

  addSplashToQuery(splash: string) {
    this.addToQuery(new SPLASHQueryTerm(splash));
  }

  addSubmitterToQuery(submitterId: string) {
    this.addToQuery(new SubmitterQueryTerm(submitterId));
  }


  addTagToQuery(tag: string, match: string = 'exact') {
    this.addToQuery(new TagQueryTerm(tag, 'tags', match));
  }

  addCompoundTagToQuery(tag: string, match: string = 'exact') {
    this.addToQuery(new TagQueryTerm(tag, 'compound.tags', match));
  }


  addMetaDataToQuery(name: string, value: string, match: string = 'exact') {
    this.addToQuery(new MetaDataQueryTerm(name, value, 'metaData', match));
  }

  addNumericMetaDataToQuery(name: string, value: number, tolerance: number) {
    this.addToQuery(new NumericMetaDataQueryTerm(name, value, tolerance, 'metaData'));
  }

  addCompoundMetaDataToQuery(name: string, value: any, match: string = 'exact') {
    this.addToQuery(new MetaDataQueryTerm(name, value, 'compound.metaData', match));
  }

  addNumericCompoundMetaDataToQuery(name: string, value: number, tolerance: number) {
    this.addToQuery(new NumericMetaDataQueryTerm(name, value, tolerance, 'compound.metaData'));
  }

  addClassificationToQuery(name: string, value: any, match: string = 'exact') {
    this.addToQuery(new MetaDataQueryTerm(name, value, 'compound.classification', match));
  }
}
