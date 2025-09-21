/*!
 * Prism Language Definition - FHIR Mapping Language (FML)
 * A syntax highlighting plugin for Prism.js
 * @version 0.1.0
 * @author Claude Code
 * @license MIT
 */

(function (Prism) {
  // Check if Prism is available
  if (typeof Prism === 'undefined') {
    return;
  }

  /**
   * Language definition for FHIR Mapping Language (FML)
   *
   * FHIR Mapping Language is a domain-specific language for transforming
   * data between different FHIR resource formats. This plugin provides
   * comprehensive syntax highlighting for .fml files.
   *
   * Token types implemented:
   * - metadata-info (/// comments with key-value pairs)
   * - comment (single-line and multi-line)
   * - string (with escape sequences)
   * - group-definition (complete group syntax with inputs/extends/stereotype)
   * - rule-label ("name"; rule endings)
   * - structure-keyword (map, uses, imports, alias, conceptmap, default)
   * - transformation-keyword (for, where, check, then, first, last, etc.)
   * - function (built-in transformation functions)
   * - transformation-arrow (->)
   * - variable-binding (as keyword)
   * - conceptmap-operator (<<, >>, ==)
   * - prefix (prefix definitions in ConceptMap)
   * - boolean (true, false)
   * - number (integers and decimals)
   * - path (dot notation paths)
   * - operator (=, !=, <, >, logical operators)
   * - identifier (variables and general identifiers)
   * - punctuation
   */

  Prism.languages.fml = {
    // Metadata information (/// url = 'value')
    'metadata-info': {
      pattern: /^\s*\/\/\/.*$/m,
      greedy: true,
      inside: {
        'metadata-key': {
          pattern: /\b\w+(?=\s*=)/,
          alias: 'property'
        },
        'metadata-value': {
          pattern: /=\s*(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
          inside: {
            operator: /=/,
            string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/
          }
        },
        comment: /\/\/\//
      }
    },

    // Comments (single-line and multi-line) - must not match metadata comments
    comment: [
      {
        pattern: /^\s*\/\/(?!\/\s*\w+\s*=).*$/m,
        greedy: true
      },
      {
        pattern: /\/\*[\s\S]*?\*\//,
        greedy: true
      }
    ],

    'group-definition': {
      pattern: /\bgroup\s+\w+(?:\s*\([^)]*\))?(?:\s+extends\s+\w+)?(?:\s*<<[^>]*>>)?\s*\{/,
      greedy: true,
      inside: {
        // Group keyword
        'structure-keyword': /\bgroup\b/,

        // Group name
        'group-name': {
          pattern: /\b\w+(?=\s*(?:\(|extends|<<|\{))/,
          alias: 'identifier'
        },

        // Inputs section with full component identification
        inputs: {
          pattern: /\([^)]*\)/,
          greedy: true,
          inside: {
            'input-typed': {
              pattern: /(?:source|target|queried|produced)\s+\w+\s*:\s*[\w[\]]+/,
              inside: {
                'mode-keyword': /^(?:source|target|queried|produced)/,
                variable: /\b\w+(?=\s*:)/,
                punctuation: /:/,
                type: /[\w[\]]+$/
              }
            },
            'input-untyped': {
              pattern: /(?:source|target|queried|produced)\s+\w+(?!\s*:)/,
              inside: {
                'mode-keyword': /^(?:source|target|queried|produced)/,
                variable: /\w+$/
              }
            }
          }
        },

        // Extends clause
        'extends-clause': {
          pattern: /\bextends\s+\w+/,
          inside: {
            keyword: /\bextends\b/,
            'parent-class': {
              pattern: /\w+$/,
              alias: 'class-name inherited'
            }
          }
        },

        // Stereotype
        stereotype: {
          pattern: /<<[^>]+>>/,
          alias: 'annotation',
          inside: {
            punctuation: /<<|>>/,
            string: /[^<>]+/
          }
        },

        // Punctuation (parentheses, braces, comma)
        punctuation: /[(){},:]/
      }
    },

    // Structure keywords (map, uses, imports, etc.) - must come before identifiers
    'structure-keyword': {
      pattern: /\b(?:map|uses|group|imports|extends|alias|conceptmap|default)\b/,
      alias: 'keyword'
    },

    // Rule labels ("name";) - must come before general strings and be more specific
    'rule-label': {
      pattern: /"[A-Za-z0-9\-.]+"(?=\s*;)/,
      greedy: true,
      inside: {
        string: /\w+/
      }
    },

    // Strings with escape sequences (including URLs)
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true,
      inside: {
        url: {
          pattern: /https?:\/\/[^\s"']+/,
          greedy: true
        },
        escape: /\\(?:[abfnrtv\\"']|\\)/
      }
    },

    // Mode keywords (source, target, queried, produced) - must come before identifiers
    'mode-keyword': {
      pattern: /\b(?:source|target|queried|produced)\b/,
      alias: 'keyword'
    },

    // Transformation keywords (for, where, check, then, etc.) - must come before identifiers
    'transformation-keyword': {
      pattern: /\b(?:for|where|check|then|first|last|share|collate|only_one|not_first|not_last)\b/,
      alias: 'keyword'
    },

    // Built-in transformation functions - must come before identifiers
    function: {
      pattern:
        /\b(?:create|copy|truncate|escape|cast|append|translate|reference|dateOp|uuid|pointer|evaluate|cc|c|qty|id|cp|upper|lower|initCap|now|matches|exists|empty|is)\b(?=\s*\()/,
      greedy: true
    },

    // Variable binding (as keyword) - must come before identifiers
    'variable-binding': {
      pattern: /\bas\b/,
      alias: 'keyword'
    },

    // Prefix definitions in ConceptMap
    prefix: {
      pattern: /\bprefix\s+\w+\s*=/,
      greedy: true,
      inside: {
        keyword: /\bprefix\b/,
        property: /\w+/,
        operator: /=/
      }
    },

    // Boolean literals - must come before identifiers
    boolean: /\b(?:true|false)\b/,

    // Numbers (integers and decimals)
    number: /\b\d+(?:\.\d+)?\b/,

    // Path expressions (src.field.subfield) - must come before identifier
    path: {
      pattern: /\b[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)+\b/,
      greedy: true
    },

    // Transformation arrow (->)
    'transformation-arrow': {
      pattern: /->/,
      alias: 'operator'
    },

    // ConceptMap operators
    'conceptmap-operator': {
      pattern: /(?:<<|>>|==)/,
      alias: 'operator'
    },

    // Logical and comparison operators
    operator: /[=!<>]=?|(?:\band\b|\bor\b|\bnot\b)/,

    // Function calls and identifiers - must come last among word patterns
    identifier: {
      pattern: /\b[a-zA-Z_]\w*\b/,
      greedy: true
    },

    // Punctuation
    punctuation: /[{}()[\];,.:|]/
  };

  // Aliases for the language
  Prism.languages.mapping = Prism.languages.fml;
  Prism.languages.structuremap = Prism.languages.fml;
})(typeof global !== 'undefined' ? global.Prism : window.Prism);
