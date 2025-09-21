/**
 * Unit tests for Prism FHIR Mapping Language (FML) Plugin
 */

const fs = require('fs');
const path = require('path');

// Mock Prism if not in browser environment
if (typeof window === 'undefined') {
  global.Prism = require('prismjs');
}

// Load the language definition
require('../src/prism-lang-fml');

describe('Prism FHIR Mapping Language (FML)', () => {
  // Check if language is registered
  describe('Language Registration', () => {
    test('should register the FML language', () => {
      expect(Prism.languages.fml).toBeDefined();
    });

    test('should have aliases', () => {
      expect(Prism.languages.mapping).toBeDefined();
      expect(Prism.languages.structuremap).toBeDefined();
      expect(Prism.languages.mapping).toBe(Prism.languages.fml);
      expect(Prism.languages.structuremap).toBe(Prism.languages.fml);
    });
  });

  // Test token patterns
  describe('Token Patterns', () => {
    describe('Comments', () => {
      test('should tokenize metadata comments', () => {
        const code = "/// url = 'http://example.org/map'";
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('metadata-info');
      });

      test('should tokenize single-line comments', () => {
        const code = '// This is a comment';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('comment');
        expect(tokens[0].content).toBe('// This is a comment');
      });

      test('should tokenize multi-line comments', () => {
        const code = '/* This is a\nmulti-line comment */';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('comment');
      });
    });

    describe('Strings', () => {
      test('should tokenize single-quoted strings', () => {
        const code = "'Patient'";
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('string');
        // Content may be processed as array when using 'inside' patterns
        const content = Array.isArray(tokens[0].content)
          ? tokens[0].content.join('')
          : tokens[0].content;
        expect(content).toBe("'Patient'");
      });

      test('should tokenize double-quoted strings', () => {
        const code = '"rule-name"';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('string');
      });

      test('should handle escape sequences in strings', () => {
        const code = '"Line 1\\nLine 2"';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('string');
      });
    });

    describe('Numbers and Booleans', () => {
      test('should tokenize integers', () => {
        const code = '42';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('number');
        expect(tokens[0].content).toBe('42');
      });

      test('should tokenize decimals', () => {
        const code = '3.14';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('number');
      });

      test('should tokenize boolean literals', () => {
        const code = 'true false';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const booleanTokens = tokens.filter((t) => t.type === 'boolean');
        expect(booleanTokens).toHaveLength(2);
        expect(booleanTokens[0].content).toBe('true');
        expect(booleanTokens[1].content).toBe('false');
      });
    });

    describe('FML Keywords', () => {
      test('should tokenize structure keywords', () => {
        const keywords = ['map', 'uses', 'group', 'imports', 'extends', 'alias', 'conceptmap'];

        keywords.forEach((keyword) => {
          const tokens = Prism.tokenize(keyword, Prism.languages.fml);
          expect(tokens).toHaveLength(1);
          expect(tokens[0].type).toBe('structure-keyword');
        });
      });

      test('should tokenize mode keywords', () => {
        const keywords = ['source', 'target', 'queried', 'produced'];

        keywords.forEach((keyword) => {
          const tokens = Prism.tokenize(keyword, Prism.languages.fml);
          expect(tokens).toHaveLength(1);
          expect(tokens[0].type).toBe('mode-keyword');
        });
      });

      test('should tokenize transformation keywords', () => {
        const keywords = ['for', 'where', 'check', 'then', 'first', 'last', 'only_one'];

        keywords.forEach((keyword) => {
          const tokens = Prism.tokenize(keyword, Prism.languages.fml);
          expect(tokens).toHaveLength(1);
          expect(tokens[0].type).toBe('transformation-keyword');
        });
      });

      test('should tokenize variable binding keyword', () => {
        const code = 'src.field as variable';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const asToken = tokens.find((t) => t.type === 'variable-binding');
        expect(asToken).toBeDefined();
        expect(asToken.content).toBe('as');
      });

      test('should not tokenize keywords in strings', () => {
        const code = '"map inside string"';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe('string');
      });
    });

    describe('FML Functions', () => {
      test('should tokenize built-in functions', () => {
        const functions = ['create', 'copy', 'translate', 'reference', 'uuid', 'cc', 'qty'];

        functions.forEach((func) => {
          const code = `${func}()`;
          const tokens = Prism.tokenize(code, Prism.languages.fml);

          const functionToken = tokens.find((t) => t.type === 'function');
          expect(functionToken).toBeDefined();
          expect(functionToken.content).toBe(func);
        });
      });

      test('should tokenize function calls in transformations', () => {
        const code = 'src -> tgt.coding = cc("system", "code")';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const functionToken = tokens.find((t) => t.type === 'function');
        expect(functionToken).toBeDefined();
        expect(functionToken.content).toBe('cc');
      });
    });

    describe('FML Operators', () => {
      test('should tokenize transformation arrow', () => {
        const code = 'src.field -> tgt.field';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const arrowToken = tokens.find((t) => t.type === 'transformation-arrow');
        expect(arrowToken).toBeDefined();
        expect(arrowToken.content).toBe('->');
      });

      test('should tokenize comparison operators', () => {
        const operators = ['=', '!=', '<', '>', '<=', '>='];

        operators.forEach((op) => {
          const tokens = Prism.tokenize(op, Prism.languages.fml);
          expect(tokens).toHaveLength(1);
          expect(tokens[0].type).toBe('operator');
        });
      });

      test('should tokenize logical operators', () => {
        const code = 'x > 5 and y < 10';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const operatorTokens = tokens.filter((t) => t.type === 'operator');
        expect(operatorTokens.length).toBeGreaterThan(0);
      });

      test('should tokenize ConceptMap operators', () => {
        const operators = ['==', '<<', '>>'];

        operators.forEach((op) => {
          const tokens = Prism.tokenize(op, Prism.languages.fml);
          const operatorToken = tokens.find(
            (t) => t.type === 'conceptmap-operator' || t.type === 'operator'
          );
          expect(operatorToken).toBeDefined();
        });
      });
    });

    describe('FML-Specific Constructs', () => {
      test('should tokenize rule labels', () => {
        const code = 'src.id -> tgt.id "copy-id";';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const labelToken = tokens.find((t) => t.type === 'rule-label');
        expect(labelToken).toBeDefined();
      });

      test('should tokenize URLs', () => {
        const code = 'uses "http://hl7.org/fhir/StructureDefinition/Patient"';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        // URL should be found inside a string token
        const stringToken = tokens.find((t) => t.type === 'string');
        expect(stringToken).toBeDefined();

        // Check if the string contains a URL token
        const hasUrl =
          Array.isArray(stringToken.content) &&
          stringToken.content.some((item) => item && item.type === 'url');
        expect(hasUrl).toBe(true);
      });

      test('should tokenize path expressions', () => {
        const code = 'src.patient.name.family';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const pathToken = tokens.find((t) => t.type === 'path');
        expect(pathToken).toBeDefined();
        expect(pathToken.content).toBe('src.patient.name.family');
      });

      test('should tokenize ConceptMap prefix', () => {
        const code = 'prefix s = "http://hl7.org/fhir/gender"';
        const tokens = Prism.tokenize(code, Prism.languages.fml);

        const prefixToken = tokens.find((t) => t.type === 'prefix');
        expect(prefixToken).toBeDefined();
      });
    });

    describe('Punctuation', () => {
      test('should tokenize punctuation marks', () => {
        const punctuation = ['{', '}', '[', ']', ';', ',', '(', ')', ':'];

        punctuation.forEach((p) => {
          const tokens = Prism.tokenize(p, Prism.languages.fml);
          expect(tokens).toHaveLength(1);
          expect(tokens[0].type).toBe('punctuation');
        });
      });
    });
  });

  // Test complex FML code samples
  describe('Complex FML Code Samples', () => {
    test('should handle FML group definition', () => {
      const code = `
        group TransformPatient(source src : Patient, target tgt : Patient) {
          src.id as id -> tgt.id = id "copy-id";
        }
      `;

      const tokens = Prism.tokenize(code, Prism.languages.fml);

      // Helper function to get all token types (including nested)
      function getAllTokenTypes(tokens, types = new Set()) {
        tokens.forEach((token) => {
          if (typeof token === 'object' && token.type) {
            types.add(token.type);
            if (Array.isArray(token.content)) {
              getAllTokenTypes(token.content, types);
            }
          }
        });
        return types;
      }

      const tokenTypes = getAllTokenTypes(tokens);

      expect(tokenTypes.has('structure-keyword')).toBe(true); // group
      expect(tokenTypes.has('mode-keyword')).toBe(true); // source, target
      expect(tokenTypes.has('variable-binding')).toBe(true); // as
      expect(tokenTypes.has('transformation-arrow')).toBe(true); // ->
      expect(tokenTypes.has('rule-label')).toBe(true); // "copy-id" :
    });

    test('should handle FML transformation with function', () => {
      const code = 'src.name as n -> tgt.display = translate(n, "#map", "display")';
      const tokens = Prism.tokenize(code, Prism.languages.fml);

      const functionToken = tokens.find((t) => t.type === 'function');
      const arrowToken = tokens.find((t) => t.type === 'transformation-arrow');
      const asToken = tokens.find((t) => t.type === 'variable-binding');

      expect(functionToken).toBeDefined();
      expect(arrowToken).toBeDefined();
      expect(asToken).toBeDefined();
    });

    test('should handle metadata comments', () => {
      const code = `
        /// url = 'http://example.org/map'
        /// name = 'TestMap'
        map "TestMap" = "Test"
      `;

      const tokens = Prism.tokenize(code, Prism.languages.fml);

      const metadataTokens = tokens.filter((t) => t.type === 'metadata-info');
      expect(metadataTokens).toHaveLength(2);
    });
  });

  // Test edge cases
  describe('Edge Cases', () => {
    test('should handle empty string', () => {
      const tokens = Prism.tokenize('', Prism.languages.fml);
      expect(tokens).toEqual(['']);
    });

    test('should handle whitespace only', () => {
      const tokens = Prism.tokenize('   \n\t  ', Prism.languages.fml);
      expect(tokens).toHaveLength(1);
      expect(typeof tokens[0]).toBe('string');
    });

    test('should handle unclosed strings gracefully', () => {
      const code = '"unclosed string';
      const tokens = Prism.tokenize(code, Prism.languages.fml);
      // Should not throw error
      expect(tokens).toBeDefined();
    });

    test('should handle nested comments correctly', () => {
      const code = '/* outer /* inner */ outer */';
      const tokens = Prism.tokenize(code, Prism.languages.fml);
      // Should tokenize as comment
      expect(tokens.some((t) => t.type === 'comment')).toBe(true);
    });

    test('should handle keywords in path expressions', () => {
      const code = 'src.group.source -> tgt.group.target';
      const tokens = Prism.tokenize(code, Prism.languages.fml);

      // 'group', 'source', 'target' should be part of paths, not keywords
      const pathTokens = tokens.filter((t) => t.type === 'path');
      expect(pathTokens.length).toBeGreaterThan(0);
    });

    test('should handle complex URL patterns', () => {
      const code = 'uses "http://hl7.org/fhir/StructureDefinition/Patient" alias Patient as source';
      const tokens = Prism.tokenize(code, Prism.languages.fml);

      // URL should be found inside a string token
      const stringToken = tokens.find((t) => t.type === 'string');
      expect(stringToken).toBeDefined();

      const hasUrl =
        Array.isArray(stringToken.content) &&
        stringToken.content.some((item) => item && item.type === 'url');
      expect(hasUrl).toBe(true);
    });
  });

  // Performance tests
  describe('Performance', () => {
    test('should handle large FML files efficiently', () => {
      // Generate a large FML code sample
      const largeCode = Array(1000).fill('src.field as f -> tgt.field = f; // rule\n').join('');

      const startTime = Date.now();
      const tokens = Prism.tokenize(largeCode, Prism.languages.fml);
      const endTime = Date.now();

      // Should complete within reasonable time (< 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
      expect(tokens).toBeDefined();
    });

    test('should not cause catastrophic backtracking with complex paths', () => {
      // Test complex path that could cause backtracking
      const complexPath = `src.${'field.'.repeat(50)}value`;

      const startTime = Date.now();
      Prism.tokenize(complexPath, Prism.languages.fml);
      const endTime = Date.now();

      // Should complete quickly
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});

// Test helper functions
describe('Test Utilities', () => {
  test('should have path module available', () => {
    expect(path).toBeDefined();
    expect(path.join).toBeDefined();
  });

  test('should have fs module available', () => {
    expect(fs).toBeDefined();
    expect(fs.existsSync).toBeDefined();
  });
});
