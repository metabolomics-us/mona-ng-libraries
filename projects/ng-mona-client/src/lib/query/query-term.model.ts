export abstract class QueryTerm {
  abstract toString(): string;
}

export class NameQueryTerm extends QueryTerm {
  match?: string;
  name: string;

  constructor(name: string, match: string = 'exact') {
    super();
    this.match = match;
    this.name = name;
  }

  toString(): string {
    return `Name: ${this.name}`;
  }
}

export class SPLASHQueryTerm extends QueryTerm {
  splash: string;

  constructor(splash: string) {
    super();
    this.splash = splash;
  }

  toString(): string {
    return `SPLASH: ${this.splash}`;
  }
}

export class SubmitterQueryTerm extends QueryTerm {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  toString(): string {
    return `Submitter: ${this.id}`;
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

  toString(): string {
    return `Tag: ${this.tag}`;
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

  toString(): string {
    return `${this.name}: ${this.value}`;
  }
}

export class NumericMetaDataQueryTerm extends QueryTerm {
  collection: string;
  name: string;
  value: number;
  tolerance: number;

  constructor(name: string, value: number, tolerance: number, collection: string = 'metaData') {
    super();
    this.collection = collection;
    this.name = name;
    this.value = value;
    this.tolerance = tolerance;
  }

  toString(): string {
    if (this.tolerance > 0) {
      return `${this.name}: ${this.value} +/- ${this.tolerance}`;
    } else {
      return `${this.name}: ${this.value}`;
    }
  }
}
