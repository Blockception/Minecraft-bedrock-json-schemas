export interface ErrorAnnotation {
  file?: string;
  line?: number;
  column?: number;
  endLine?: number;
  title?: string;
}

export namespace Github {
  export function createError(message: string, error: ErrorAnnotation = {}): void {
    const data = Object.entries(error)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join(",");

    console.log(`::error ${data}::${message}`);
  }

  export function startGroup(title: string): void {
    console.log(`::group::${title}`);
  }

  export function endGroup(): void {
    console.log(`::endgroup::`);
  }
}
