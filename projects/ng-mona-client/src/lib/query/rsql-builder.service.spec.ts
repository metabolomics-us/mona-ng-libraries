import { TestBed } from '@angular/core/testing';

import { RSQLBuilderService } from './rsql-builder.service';
import { TagQueryTerm, QueryTerm, SPLASHQueryTerm, SubmitterQueryTerm, NameQueryTerm, MetaDataQueryTerm, NumericMetaDataQueryTerm } from './query-term.model';

describe('RSQLBuilderService', () => {
  let service: RSQLBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RSQLBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be generate a name query', () => {
    let terms: QueryTerm[] = [new NameQueryTerm('glucose')];
    let rsql: string = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`compound.names=q='name=="glucose"'`);

    terms = [new NameQueryTerm('glucose', 'like')];
    rsql = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`compound.names=q='name=like="glucose"'`);
  });

  it('should be generate a SPLASH query', () => {
    const terms: QueryTerm[] = [new SPLASHQueryTerm('splash10-03fr-0900000000-035ec76d23650a15673b')];
    const rsql: string = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`splash.splash=="splash10-03fr-0900000000-035ec76d23650a15673b"`);
  });

  it('should be generate a submitter query', () => {
    const terms: QueryTerm[] = [new SubmitterQueryTerm('admin')];
    const rsql: string = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`submitter.id=="admin"`);
  });

  it('should be generate a tag query', () => {
    const terms: QueryTerm[] = [new TagQueryTerm('LC-MS')];
    const rsql: string = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`tags.text=="LC-MS"`);
  });

  it('should be generate a metadata query', () => {
    let terms: QueryTerm[] = [new MetaDataQueryTerm('instrument', 'qtof')];
    let rsql: string = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`metaData=q='name=="instrument" and value=="qtof"'`);

    terms = [new MetaDataQueryTerm('instrument', 'qtof', 'metaData', 'regex')];
    rsql = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`metaData=q='name=="instrument" and value=match=".*qtof.*"'`);

    terms = [new MetaDataQueryTerm('instrument', 'qtof', 'metaData', 'like')];
    rsql = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`metaData=q='name=="instrument" and value=like="qtof"'`);
  });

  it('should be generate a numeric metadata query', () => {
    let terms: QueryTerm[] = [new NumericMetaDataQueryTerm('precursor m/z', 100, 1)];
    let rsql: string = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`metaData=q='name=="precursor m/z" and value>=99 and value<=101'`);

    terms = [new NumericMetaDataQueryTerm('precursor m/z', 100, 0.5)];
    rsql = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`metaData=q='name=="precursor m/z" and value>=99.5 and value<=100.5'`);
  });

  it('should be generate a complex query', () => {
    const terms: QueryTerm[] = [new TagQueryTerm('LC-MS'), new NumericMetaDataQueryTerm('precursor m/z', 100, 1)];
    const rsql: string = service.buildRSQLFromQueryTerms(terms);
    expect(rsql).toEqual(`tags.text=="LC-MS" and metaData=q='name=="precursor m/z" and value>=99 and value<=101'`);
  });
});
