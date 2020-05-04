import { Injectable } from '@angular/core';
import { QueryTerm, MetaDataQueryTerm, NameQueryTerm, NumericMetaDataQueryTerm, SPLASHQueryTerm, SubmitterQueryTerm, TagQueryTerm } from './query-term.model';

@Injectable({
  providedIn: 'root'
})
export class RSQLBuilderService {

  constructor() { }

  /**
   * constructs an RSQL query from query term components
   * @param queryTerms list of query terms to convert
   */
  buildRSQLFromQueryTerms(queryTerms: QueryTerm[]): string {
    const rsqlTerms = [];

    queryTerms.forEach(x => {
      if (x instanceof NameQueryTerm) {
        rsqlTerms.push(this.buildRSQLFromNameTerm(x));
      }

      if (x instanceof SPLASHQueryTerm) {
        rsqlTerms.push(this.buildRSQLFromSPLASHTerm(x));
      }

      if (x instanceof SubmitterQueryTerm) {
        rsqlTerms.push(this.buildRSQLFromSubmitterTerm(x));
      }

      if (x instanceof TagQueryTerm) {
        rsqlTerms.push(this.buildRSQLFromTagTerm(x));
      }

      if (x instanceof MetaDataQueryTerm) {
        rsqlTerms.push(this.buildRSQLFromMetaDataTerm(x));
      }

      if (x instanceof NumericMetaDataQueryTerm) {
        rsqlTerms.push(this.buildRSQLFromNumericMetaDataTerm(x));
      }
    });

    return rsqlTerms.join(' and ');
  }

  /**
   * build an RSQL query for a compound name query
   * @param queryTerm query term for a compound name
   */
  private buildRSQLFromNameTerm(queryTerm: NameQueryTerm): string {
    switch (queryTerm.match) {
      case 'exact':
        return `compound.names=q='name=="${queryTerm.name}"'`;
      case 'ne':
        return `compound.names=q='name!="${queryTerm.name}"'`;
      case 'regex':
        return `compound.names=q='name=match=".*${queryTerm.name}.*"'`;
      case 'like':
        return `compound.names=q='name=like="${queryTerm.name}"'`;
    }
  }

  /**
   * build an RSQL query for a SPLASH query
   * @param queryTerm query term for a SPLASH
   */
  private buildRSQLFromSPLASHTerm(queryTerm: SPLASHQueryTerm): string {
    const splash = queryTerm.splash.toLowerCase().trim();

    if (/^(splash[0-9]{2}-[a-z0-9]{4}-[0-9]{10}-[a-z0-9]{20})$/.test(splash)) {
      return `splash.splash=="${splash}"`;
    } else if (/^splash[0-9]{2}/.test(splash)) {
      return `splash.splash=match="${splash}.*"`;
    } else {
      return `splash.splash=match=".*${splash}.*"`;
    }
  }

  /**
   * build an RSQL query for a submitter query
   * @param queryTerm query term for a submitter
   */
  private buildRSQLFromSubmitterTerm(queryTerm: SubmitterQueryTerm): string {
    return `submitter.id=="${queryTerm.id}"`;
  }

  /**
   * build an RSQL query for a tag query
   * @param queryTerm query term for a tag
   */
  private buildRSQLFromTagTerm(queryTerm: TagQueryTerm): string {
    switch (queryTerm.match) {
      case 'exact':
        return `${queryTerm.collection}.text=="${queryTerm.tag}"`;
      case 'ne':
        return `${queryTerm.collection}.text!="${queryTerm.tag}"`;
      case 'regex':
        return `${queryTerm.collection}.text=match=".*${queryTerm.tag}.*"`;
      case 'like':
        return `${queryTerm.collection}.text=like="${queryTerm.tag}"`;
    }
  }

  /**
   * build an RSQL query for a metadata query
   * @param queryTerm query term for metadata
   */
  private buildRSQLFromMetaDataTerm(queryTerm: MetaDataQueryTerm): string {
    switch (queryTerm.match) {
      case 'exact':
        return `${queryTerm.collection}=q='name=="${queryTerm.name}" and value=="${queryTerm.value}"'`;
      case 'ne':
        return `${queryTerm.collection}=q='name=="${queryTerm.name}" and value!="${queryTerm.value}"'`;
      case 'regex':
        return `${queryTerm.collection}=q='name=="${queryTerm.name}" and value=match=".*${queryTerm.value}.*"'`;
      case 'like':
        return `${queryTerm.collection}=q='name=="${queryTerm.name}" and value=like="${queryTerm.value}"'`;
    }
  }

  /**
   * build an RSQL query for a numeric metadata query
   * @param queryTerm query term for numeric metadata
   */
  private buildRSQLFromNumericMetaDataTerm(queryTerm: NumericMetaDataQueryTerm): string {
    if (queryTerm.tolerance > 0) {
      const leftBoundary = queryTerm.value - queryTerm.tolerance;
      const rightBoundary = queryTerm.value + queryTerm.tolerance;

      return `${queryTerm.collection}=q='name=="${queryTerm.name}" and value>=${leftBoundary} and value<=${rightBoundary}'`;
    } else {
      return `${queryTerm.collection}=q='name=="${queryTerm.name}" and value==${queryTerm.value}'`;
    }
  }
}
