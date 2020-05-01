import { Injectable } from '@angular/core';

import bencodec from 'bencodec';

@Injectable({
  providedIn: 'root'
})
export class SpectrumQueryService {

  queryTerms: any[] = [];

  query: string;
  textSearch: string;

  constructor() {
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
    console.log(bencodec.encode({type: 'name', match: 'exact', name: 'test'}).toString());

    const terms = [];

    if (this.query && this.query !== '') {
      terms.push(this.query);
    }

    this.queryTerms.forEach(x => {
      switch (x.type) {
        case 'tag':
          terms.push(`tags.text==${x.tag}`);
          break;

        case 'name':
          terms.push(`compound.names=q='name=like="${x.name}"'`);
          break;

        case 'metaData':
          terms.push(`${x.collection}=q='name=="${x.name}" and value=="${x.value}"'`);
          break;
      }
    });

    return terms.join(' and ');
  }

  getQueryTerms() {
    return this.queryTerms;
  }

  getQuery() {
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


  addNameToQuery(name: string, match: string = 'exact') {
    this.queryTerms.push({type: 'name', match, name});
  }

  addSplashToQuery(splash: string, match: string = 'exact') {
    this.queryTerms.push({type: 'name', match, name});
  }

  addSubmitterToQuery(submitterId: string) {

  }


  addTagToQuery(tag: string, match: string = 'exact', collection: string = 'tags') {
    this.queryTerms.push({type: 'tag', collection, match, tag});
  }

  addCompoundTagToQuery(tag: string, match: string = 'exact', collection: string = 'tags') {
    this.addMetaDataToQuery(tag, match, 'compound.tags');
  }


  addMetaDataToQuery(name: string, value: any, match: string = 'exact', collection: string = 'metaData') {
    this.queryTerms.push({type: 'metaData', collection, match, name, value});
  }

  addCompoundMetaDataToQuery(name: string, value: any, match: string = 'exact') {
    this.addMetaDataToQuery(name, value, match, 'compound.metaData');
  }

  addClassificationToQuery(name: string, value: any, match: string = 'exact') {
    this.addMetaDataToQuery(name, value, match, 'compound.classification');
  }
}
