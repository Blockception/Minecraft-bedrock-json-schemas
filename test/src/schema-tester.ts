import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import * as url from 'url';
import {
  Diagnostic,
  getLanguageService,
  JSONDocument,
  LanguageService,
  LanguageSettings,
  SchemaConfiguration,
  TextDocument,
  Thenable,
} from 'vscode-json-languageservice';
import * as data from '../../vscode-settings.json';
import { Files } from './utillity';

export namespace Schema {
  const workspaceContext = {
    resolveRelativePath: (relativePath: string, resource: string) => {
      return url.resolve(resource, relativePath);
    },
  };

  export function GetValidator(): Validator {
    const ls = GetLanguageService();
    ls.configure(GetLanguageSettings());

    const out = new Validator(ls);

    return out;
  }

  export function GetLanguageService(): LanguageService {
    return getLanguageService({
      workspaceContext,
      schemaRequestService: getSchema,
    });
  }

  export async function getSchema(uri: string): Promise<string> {
    const rootfolder = Files.RootFolder();
    const filepath = uri.replace(
      'https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main',
      rootfolder,
    );

    if (!existsSync(filepath)) {
      throw new Error("file doesn't exist: " + filepath);
    }

    return readFileSync(filepath).toString();
  }

  export function GetLanguageSettings(): LanguageSettings {
    const schemas: SchemaConfiguration[] = [];
    const settings: LanguageSettings = {
      schemas: schemas,
    };
    let rootfolder = Files.RootFolder();

    if (!rootfolder.endsWith('/')) rootfolder += '/';
    rootfolder = path.normalize(rootfolder);

    data['json.schemas'].forEach((m) => {
      if (m) {
        let matches = m.fileMatch;
        if (typeof matches === 'string') {
          matches = [matches];
        }

        schemas.push({ uri: m.url, fileMatch: matches });
      }
    });

    return settings;
  }
}

export class Validator {
  readonly ls: LanguageService;

  constructor(ls: LanguageService) {
    this.ls = ls;
  }

  ValidateFile(uri: string): Result {
    const content = readFileSync(uri).toString();
    return this.ValidateContent(content, uri, 'json');
  }

  ValidateJson(data: any, fakeuri: string = '', langid: string = 'json'): Result {
    return this.ValidateContent(JSON.stringify(data), fakeuri, langid);
  }

  ValidateContent(json: string, fakeuri: string = '', langid: string = 'json'): Result {
    const doc = TextDocument.create(fakeuri, langid, 0, json);
    const jdoc = this.ls.parseJSONDocument(doc);

    const p = this.ls.doValidation(doc, jdoc, { comments: 'ignore' });

    return new Result(doc, jdoc, p);
  }
}

export class Result {
  readonly doc: TextDocument;
  readonly jdoc: JSONDocument;
  readonly promise: Thenable<Diagnostic[]>;

  constructor(doc: TextDocument, jdoc: JSONDocument, promise: Thenable<Diagnostic[]>) {
    this.doc = doc;
    this.jdoc = jdoc;
    this.promise = promise;
  }
}
