import * as path from 'path';

export namespace DummyFiles {
  export function TestFolder(): string {
    return path.join(__dirname, '..', '..', 'test');
  }
}
