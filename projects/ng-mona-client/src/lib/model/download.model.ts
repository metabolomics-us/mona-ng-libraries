export class PredefinedQuery {
  label: string;
  description: string;

  query: string;
  queryCount: number;

  jsonExport: QueryExport;
  mspExport: QueryExport;
  sdfExport: QueryExport;
}

export class QueryExport {
  id: string;

  label: string;
  query: string;
  format: string;
  emailAddress: string;

  date: Date;
  count: number;
  size: number;

  queryFile: string;
  exportFile: string;
}

export class StaticDownload {
  fileName: string;
  category: string;
  description: string;
}
