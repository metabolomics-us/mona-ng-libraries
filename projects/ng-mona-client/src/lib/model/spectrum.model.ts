/**
 * Spectrum Classes
 */
export class Spectrum {
  id: string;
  dateCreated: Date;
  lastUpdated: Date;
  lastCurated: Date;
  score: Score;

  compound: Array<Compound>;
  metaData: Array<MetaData>;
  annotations: Array<MetaData>;
  tags: Array<Tag>;
  spectrum: string;
  splash: Splash;
  submitter: Submitter;
  library: Library;
}

export class Splash {
  splash: string;
}

export class Submitter {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  institution: string;

  constructor(emailAddress: string, firstName: string, lastName: string, institution: string) {
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
    this.institution = institution;
  }
}

export class Library {
  id: string;
  library: string;
  description: string;
  link: string;
  tag: Tag;
}


/**
 * General classes
 */
export class MetaData {
  category: string;
  computed: boolean;
  hidden: boolean;
  name: string;
  value: any;
  unit: string;
  url: string;
}

export class Tag {
  ruleBased: boolean;
  text: string;
}


/**
 * Compound classes
 */
export class Compound {
  computed: boolean;
  kind: string;

  inchi: string;
  inchiKey: string;
  molFile: string;

  names: Array<Name>;
  metaData: Array<MetaData>;
  classification: Array<MetaData>;
  tags: Array<Tag>;
}

export class Name {
  computed: boolean;
  name: string;
  score: number;
  source: string;
}


/**
 * Score classes
 */
export class Score {
  impacts: Array<Impact>;
  score: number;
}

export class Impact {
  value: number;
  reason: string;
}
