import { existsSync } from 'fs';
import * as path from 'path';
import { Schema } from '../schema-tester';
import { Files } from '../utillity';

describe('test bedrock-samples UI files', function () {
  const uiFolder = path.join(Files.BedrockSamplesFolder(), 'resource_pack', 'ui');

  if (!existsSync(uiFolder)) {
    test.skip('bedrock-samples submodule is not initialized — skipping UI schema tests', () => {});
    return;
  }

  const files = Files.GetFiles(uiFolder).filter((f) => f.endsWith('.json'));
  const validator = Schema.GetValidator();

  expect(files.length).toBeGreaterThan(0);

  test.each(files)('UI file should match a schema: %s', async (file) => {
    const result = validator.ValidateFile(file);
    const schemas = validator.ls.getMatchingSchemas(result.doc, result.jdoc);

    const s = await schemas;
    expect(s.length).toBeGreaterThan(0);
  });

  test.each(files)('UI file should validate without errors: %s', async (file) => {
    const result = validator.ValidateFile(file);

    const diagnostics = await result.promise;
    diagnostics.forEach((d) => console.log(`[${file}] ${d.message}`));
    expect(diagnostics).toHaveLength(0);
  });
});
