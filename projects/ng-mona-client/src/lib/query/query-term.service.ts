import { Injectable } from '@angular/core';
import { MetaDataQueryTerm, NameQueryTerm, NumericMetaDataQueryTerm, QueryTerm, SPLASHQueryTerm, SubmitterQueryTerm, TagQueryTerm } from './query-term.model';
import { RSQLBuilderService } from './rsql-builder.service';

import bencodec from 'bencodec';

@Injectable({
  providedIn: 'root'
})
export class QueryTermService {

  private TERM_MAPPER = {
    match: 'm',
    tag: 't',
    splash: 's',
    id: 'id',
    collection: 'c',
    name: 'n',
    value: 'v',
    tolerance: 'tol'
  };

  private COLLECTION_MAPPER = {
    tags: 't',
    'compound.tags': 'ct',

    metaData: 'm',
    'compound.metaData': 'cm',
    'compound.classification': 'cc'
  };

  private MATCH_MAPPER = {
    exact: 'e',
    ne: 'ne',
    regex: 'r',
    like: 'l'
  };

  constructor(private rsqlBuilderService: RSQLBuilderService) { }

  /**
   *
   * @param mapper term mapper
   * @param value value to lookup
   */
  private getKeyByValue(mapper, value) {
    const keys = Object.keys(mapper).filter(x => mapper[x] === value);
    return keys.length > 0 ? keys[0] : null;
  }

  /**
   * encode a query term using the bencode library
   * @param queryTerm query term to encode
   */
  encode(queryTerm: QueryTerm): string {
    const exportTerm: any = {};

    // add query term type to export
    if (queryTerm instanceof NameQueryTerm) {
      exportTerm.x = 'n';
    } else if (queryTerm instanceof SPLASHQueryTerm) {
      exportTerm.x = 's';
    } else if (queryTerm instanceof SubmitterQueryTerm) {
      exportTerm.x = 'sub';
    } else if (queryTerm instanceof TagQueryTerm) {
      exportTerm.x = 't';
    } else if (queryTerm instanceof MetaDataQueryTerm) {
      exportTerm.x = 'm';
    } else if (queryTerm instanceof NumericMetaDataQueryTerm) {
      exportTerm.x = 'nm';
    } else {
      throw new Error('invalid query term object type encountered');
    }

    // map query term properties to export
    Object.entries(queryTerm).forEach(([k, v]) => {
      if (k === 'collection') {
        exportTerm[this.TERM_MAPPER[k]] = this.COLLECTION_MAPPER[v];
      } else if (k === 'match') {
        exportTerm[this.TERM_MAPPER[k]] = this.MATCH_MAPPER[v];
      } else if (this.TERM_MAPPER.hasOwnProperty(k)) {
        exportTerm[this.TERM_MAPPER[k]] = v;
      } else {
        throw new Error(`invalid query term property encountered: ${k}`);
      }
    });

    // encode the query term
    return bencodec.encode(exportTerm).toString();
  }

  /**
   * decode a string back into a query object
   * @param encodedTerm bencodec string
   */
  decode(encodedTerm: string): QueryTerm {
    // decode the query
    const queryObject: any = bencodec.decode(encodedTerm, {stringify: true});

    switch (queryObject.x) {
      case 'n':
        return new NameQueryTerm(
          queryObject[this.TERM_MAPPER.name],
          this.getKeyByValue(this.MATCH_MAPPER, queryObject[this.TERM_MAPPER.match])
        );

      case 's':
        return new SPLASHQueryTerm(queryObject[this.TERM_MAPPER.splash]);

      case 'sub':
        return new SubmitterQueryTerm(queryObject[this.TERM_MAPPER.id]);

      case 't':
        return new TagQueryTerm(
          queryObject[this.TERM_MAPPER.tag],
          this.getKeyByValue(this.COLLECTION_MAPPER, queryObject[this.TERM_MAPPER.collection]),
          this.getKeyByValue(this.MATCH_MAPPER, queryObject[this.TERM_MAPPER.match])
        );

      case 'm':
        return new MetaDataQueryTerm(
          queryObject[this.TERM_MAPPER.name],
          queryObject[this.TERM_MAPPER.value],
          this.getKeyByValue(this.COLLECTION_MAPPER, queryObject[this.TERM_MAPPER.collection]),
          this.getKeyByValue(this.MATCH_MAPPER, queryObject[this.TERM_MAPPER.match])
        );

      case 'nm':
        return new NumericMetaDataQueryTerm(
          queryObject[this.TERM_MAPPER.name],
          queryObject[this.TERM_MAPPER.value],
          queryObject[this.TERM_MAPPER.tolerance],
          this.getKeyByValue(this.COLLECTION_MAPPER, queryObject[this.TERM_MAPPER.collection])
        );

      default:
        throw new Error(`invalid query term object type encountered: ${queryObject.x}`);
    }
  }
}
