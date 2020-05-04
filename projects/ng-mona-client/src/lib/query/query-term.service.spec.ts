import { TestBed } from '@angular/core/testing';

import { QueryTermService } from './query-term.service';
import { TagQueryTerm, QueryTerm, SPLASHQueryTerm, SubmitterQueryTerm, NameQueryTerm, MetaDataQueryTerm, NumericMetaDataQueryTerm } from './query-term.model';

describe('QueryTermService', () => {
  let service: QueryTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encode and decode a name term', () => {
    const term = new NameQueryTerm('glucose');
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d1:m1:e1:n7:glucose1:x1:ne');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(NameQueryTerm);
    expect(decoded).not.toBeInstanceOf(TagQueryTerm);
    expect((decoded as NameQueryTerm).name).toEqual(term.name);
  });

  it('should encode and decode a SPLASH term', () => {
    const term = new SPLASHQueryTerm('splash10-03fr-0900000000-035ec76d23650a15673b');
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d1:s45:splash10-03fr-0900000000-035ec76d23650a15673b1:x1:se');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(SPLASHQueryTerm);
    expect((decoded as SPLASHQueryTerm).splash).toEqual(term.splash);
  });

  it('should encode and decode a submitter term', () => {
    const term = new SubmitterQueryTerm('admin');
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d2:id5:admin1:x3:sube');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(SubmitterQueryTerm);
    expect((decoded as SubmitterQueryTerm).id).toEqual(term.id);
  });

  it('should encode and decode a tag term', () => {
    const term = new TagQueryTerm('LC-MS');
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d1:c1:t1:m1:e1:t5:LC-MS1:x1:te');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(TagQueryTerm);
    expect((decoded as TagQueryTerm).tag).toEqual(term.tag);
    expect((decoded as TagQueryTerm).collection).toEqual(term.collection);
    expect((decoded as TagQueryTerm).match).toEqual(term.match);
  });

  it('should encode and decode a complex tag term', () => {
    const term = new TagQueryTerm('LC-MS', 'compound.tags', 'like');
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d1:c2:ct1:m1:l1:t5:LC-MS1:x1:te');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(TagQueryTerm);
    expect((decoded as TagQueryTerm).tag).toEqual(term.tag);
    expect((decoded as TagQueryTerm).collection).toEqual(term.collection);
    expect((decoded as TagQueryTerm).match).toEqual(term.match);
  });

  it('should encode and decode a metadata term', () => {
    const term = new MetaDataQueryTerm('instrument', 'qtof');
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d1:c1:m1:m1:e1:n10:instrument1:v4:qtof1:x1:me');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(MetaDataQueryTerm);
    expect((decoded as MetaDataQueryTerm).name).toEqual(term.name);
    expect((decoded as MetaDataQueryTerm).value).toEqual(term.value);
    expect((decoded as MetaDataQueryTerm).collection).toEqual(term.collection);
    expect((decoded as MetaDataQueryTerm).match).toEqual(term.match);
  });

  it('should encode and decode a complex metadata term', () => {
    const term = new MetaDataQueryTerm('instrument', 'qtof', 'compound.classification', 'regex');
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d1:c2:cc1:m1:r1:n10:instrument1:v4:qtof1:x1:me');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(MetaDataQueryTerm);
    expect((decoded as MetaDataQueryTerm).name).toEqual(term.name);
    expect((decoded as MetaDataQueryTerm).value).toEqual(term.value);
    expect((decoded as MetaDataQueryTerm).collection).toEqual(term.collection);
    expect((decoded as MetaDataQueryTerm).match).toEqual(term.match);
  });

  it('should encode and decode a numeric metadata term', () => {
    const term = new NumericMetaDataQueryTerm('precursor m/z', 100, 1);
    const encoded: string = service.encode(term);
    expect(encoded).toEqual('d1:c1:m1:n13:precursor m/z3:toli1e1:vi100e1:x2:nme');

    const decoded: QueryTerm = service.decode(encoded);
    expect(decoded).toBeInstanceOf(NumericMetaDataQueryTerm);
    expect((decoded as NumericMetaDataQueryTerm).name).toEqual(term.name);
    expect((decoded as NumericMetaDataQueryTerm).value).toEqual(term.value);
    expect((decoded as NumericMetaDataQueryTerm).value).toEqual(jasmine.any(Number));
    expect((decoded as NumericMetaDataQueryTerm).tolerance).toEqual(term.tolerance);
    expect((decoded as NumericMetaDataQueryTerm).tolerance).toEqual(jasmine.any(Number));
    expect((decoded as NumericMetaDataQueryTerm).collection).toEqual(term.collection);
  });
});
