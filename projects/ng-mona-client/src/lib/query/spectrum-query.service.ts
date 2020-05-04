import { Injectable } from '@angular/core';

import { RSQLBuilderService } from './rsql-builder.service';
import { MetaDataQueryTerm, NameQueryTerm, NumericMetaDataQueryTerm, QueryTerm, SPLASHQueryTerm, SubmitterQueryTerm, TagQueryTerm } from './query-term.model';
import { QueryTermService } from './query-term.service';

@Injectable({
  providedIn: 'root'
})
export class SpectrumQueryService {

  queryTerms: QueryTerm[] = [];

  query: string;
  textSearch: string;

  constructor(private rsqlBuilderService: RSQLBuilderService, private queryTermService: QueryTermService) {
    this.resetQuery();
  }

  /**
   * reset current query
   */
  resetQuery() {
    console.log('Reseting query');

    this.queryTerms = [];
    this.query = '';
    this.textSearch = '';
  }

  /**
   * build query components into an RSQL query string
   */
  buildRSQLQuery(): string {
    const rsql: string = this.rsqlBuilderService.buildRSQLFromQueryTerms(this.queryTerms);

    if (this.query && this.query !== '') {
      return `${rsql} and ${this.query}`;
    } else {
      return rsql;
    }
  }

  getQueryTerms(): QueryTerm[] {
    return this.queryTerms;
  }

  setQueryTerms(queryTerms: QueryTerm[]) {
    this.queryTerms = queryTerms;
  }

  getEncodedQueryTerms(): string[] {
    return this.queryTerms.map(x => this.queryTermService.encode(x));
  }

  setEncodedQueryTerms(queryTerms: string[]) {
    this.queryTerms = queryTerms.map(x => this.queryTermService.decode(x));
  }

  getQuery(): string {
    return this.query;
  }

  setQuery(query: string) {
    this.query = query;
  }

  getTextSearch(): string {
    return this.textSearch;
  }

  setTextSearch(textSearch: string) {
    this.textSearch = textSearch;
  }


  addNameToQuery(name: string, match: string = 'like') {
    this.queryTerms.push(new NameQueryTerm(name, match));
  }

  addSplashToQuery(splash: string) {
    this.queryTerms.push(new SPLASHQueryTerm(splash));
  }

  addSubmitterToQuery(submitterId: string) {
    this.queryTerms.push(new SubmitterQueryTerm(submitterId));
  }


  addTagToQuery(tag: string, match: string = 'exact') {
    this.queryTerms.push(new TagQueryTerm(tag, 'tags', match));
  }

  addCompoundTagToQuery(tag: string, match: string = 'exact') {
    this.queryTerms.push(new TagQueryTerm(tag, 'compound.tags', match));
  }


  addMetaDataToQuery(name: string, value: string, match: string = 'exact') {
    this.queryTerms.push(new MetaDataQueryTerm(name, value, 'metaData', match));
  }

  addNumericMetaDataToQuery(name: string, value: number, tolerance: number) {
    this.queryTerms.push(new NumericMetaDataQueryTerm(name, value, tolerance, 'metaData'));
  }

  addCompoundMetaDataToQuery(name: string, value: any, match: string = 'exact') {
    this.queryTerms.push(new MetaDataQueryTerm(name, value, 'compound.metaData', match));
  }

  addNumericCompoundMetaDataToQuery(name: string, value: number, tolerance: number) {
    this.queryTerms.push(new NumericMetaDataQueryTerm(name, value, tolerance, 'compound.metaData'));
  }

  addClassificationToQuery(name: string, value: any, match: string = 'exact') {
    this.queryTerms.push(new MetaDataQueryTerm(name, value, 'compound.classification', match));
  }
}
