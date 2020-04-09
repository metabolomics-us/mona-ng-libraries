export class GlobalStatistics {
  id: string;
  date: Date;
  spectrumCount: number;
  compoundCount: number;
  metaDataCount: number;
  metaDataValueCount: number;
  tagCount: number;
  tagValueCount: number;
  submitterCount: number;
}

export class TagStatistics {
  id: string;
  text: string;
  ruleBased: boolean;
  count: number;
  category?: string;
}

export class CompoundClassStatistics {
  name: string;
  spectrumCount: number;
  compoundCount: number;
}

export class SubmitterStatistics {
  id: string;
  firstName: string;
  lastName: string;
  institution: string;
  count: number;
  score: number;
}

export class MetaDataSummaryStatistics {
  name: string;
  count: number;
}

export class MetaDataStatistics {
  name: string;
  count: number;
  values: MetaDataValueCount[];
}

export class MetaDataValueCount {
  value: string;
  count: number;
}
