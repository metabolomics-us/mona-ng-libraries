export abstract class QueryTerm {

  // toString(): string;

  // encode(): string {
  //   return '';
  // }
}

export class NameQueryTerm extends QueryTerm {
  match?: string;
  name: string;

  constructor(name: string, match: string = 'exact') {
    super();
    this.match = match;
    this.name = name;
  }
}

export class SPLASHQueryTerm extends QueryTerm {
  splash: string;

  constructor(splash: string) {
    super();
    this.splash = splash;
  }
}

export class SubmitterQueryTerm extends QueryTerm {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}

export class TagQueryTerm extends QueryTerm {
  match: string;
  collection: string;
  tag: string;

  constructor(tag: string, collection: string = 'tags', match: string = 'exact') {
    super();
    this.match = match;
    this.collection = collection;
    this.tag = tag;
  }
}

export class MetaDataQueryTerm extends QueryTerm {
  match: string;
  collection: string;
  name: string;
  value: string;

  constructor(name: string, value: string, collection: string = 'metaData', match: string = 'exact') {
    super();
    this.match = match;
    this.collection = collection;
    this.name = name;
    this.value = value;
  }
}

export class NumericMetaDataQueryTerm extends QueryTerm {
  match: string;
  collection: string;
  name: string;
  value: number;
  tolerance: number;

  constructor(name: string, value: number, tolerance: number, collection: string = 'metaData', match: string = 'exact') {
    super();
    this.match = match;
    this.collection = collection;
    this.name = name;
    this.value = value;
    this.tolerance = tolerance;
  }
}
