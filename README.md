# prism-lang-fml

A Prism.js language definition plugin for FHIR Mapping Language (FML)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Prism.js Compatible](https://img.shields.io/badge/Prism.js-Compatible-purple.svg)](https://prismjs.com)
[![FHIR R5](https://img.shields.io/badge/FHIR-R5-blue.svg)](https://hl7.org/fhir/R5/)

## 📋 Overview

This project provides a comprehensive language definition plugin for [Prism.js](https://prismjs.com), enabling syntax highlighting for **FHIR Mapping Language (FML)** files. FML is a domain-specific language for transforming data between different FHIR resource formats, essential for healthcare interoperability.

## 🚀 Features

- **Complete FML syntax support** - All keywords, operators, and constructs
- **Comprehensive token highlighting** - Metadata comments, transformation arrows, functions
- **FHIR-aware patterns** - URLs, paths, ConceptMaps, structure definitions
- **Performance optimized** - Regex patterns designed to avoid backtracking
- **Compatible with Prism.js 1.15+** - Works with all modern Prism.js versions
- **Extensive test coverage** - 50+ test cases covering all FML features
- **Visual testing** - Interactive demo for real-time syntax verification

## 📁 Project Structure

```
prism-lang-fml/
├── src/
│   ├── prism-lang-fml.js      # Main language definition
│   └── prism-lang-fml.css     # Optional fml styling
├── test/
│   ├── fixtures/                 # Test code samples
│   ├── prism-lang-fml.test.js # Unit tests
│   └── visual.html               # Visual testing page
├── examples/
│   └── demo.html                 # Usage examples
├── dist/                         # Built/minified files
│   ├── prism-lang-fml.min.js
│   └── prism-lang-fml.min.css
├── docs/
│   └── LANGUAGE_SPEC.md         # Language specification
├── .github/
│   ├── workflows/               # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md              # Contribution guidelines
├── CLAUDE.md                    # Claude Code assistant guide
├── LICENSE                      # MIT License
├── package.json
├── .gitignore
├── .eslintrc.json
└── README.md                    # This file
```

## 🔧 Installation

### Using npm

```bash
npm install prism-lang-fml
```

### Using CDN

```html
<!-- Include Prism.js core -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js"></script>

<!-- Include the language definition -->
<script src="https://cdn.jsdelivr.net/npm/prism-lang-fml@0.1.0/prism-lang-fml.min.js"></script>
```

### Manual Installation

1. Download the plugin files from the `dist/` directory
2. Include them in your HTML after Prism.js core

## 📖 Usage

### Basic Usage

```html
<pre><code class="language-fml">
/// url = 'http://example.org/fhir/StructureMap/PatientTransform'
/// name = 'PatientTransformation'

map "PatientTransform" = "Transform"

uses "http://hl7.org/fhir/StructureDefinition/Patient" alias Patient as source
uses "http://hl7.org/fhir/StructureDefinition/Bundle" alias Bundle as target

group TransformPatient(source src : Patient, target tgt : Bundle) {
  src.id as id -> tgt.id = id "copyId"
  src.name as n where n.use = 'official' -> tgt.displayName = n
  src.gender as g -> tgt.genderCode = translate(g, '#GenderMap', 'code')
}
</code></pre>

<script>
  // Highlight all code blocks
  Prism.highlightAll();
</script>
```

### Advanced Usage

```javascript
// Programmatic highlighting
const fmlCode = `
  src.identifier as id where id.system = 'http://example.org/mrn' then {
    id -> tgt.identifier = create('Identifier') as newId then {
      id.value as v -> newId.value = v "setValue"
      id -> newId.system = 'http://newexample.org/mrn' "setSystem"
    }
  }
`;

const html = Prism.highlight(fmlCode, Prism.languages.fml, 'fml');
```

### Supported Token Types

The plugin recognizes and highlights the following FML constructs:

| Token Type               | Description                   | Example                           |
| ------------------------ | ----------------------------- | --------------------------------- |
| `metadata-comment`       | Metadata declarations         | `/// url = 'http://example.org'`  |
| `structure-keyword`      | Structure definition keywords | `map`, `uses`, `group`, `imports` |
| `mode-keyword`           | Parameter mode keywords       | `source`, `target`, `queried`     |
| `transformation-keyword` | Transformation operations     | `for`, `where`, `check`, `then`   |
| `function`               | Built-in functions            | `create()`, `translate()`, `cc()` |
| `transformation-arrow`   | Transformation operator       | `->`                              |
| `rule-label`             | Named rule labels             | `"copyId" :`                      |
| `variable-binding`       | Variable binding keyword      | `as`                              |
| `url`                    | HTTP/HTTPS URLs               | `http://hl7.org/fhir/Patient`     |
| `path`                   | Path expressions              | `src.patient.name.family`         |
| `operator`               | Logical/comparison operators  | `=`, `!=`, `and`, `or`            |
| `string`                 | String literals               | `'Patient'`, `"Bundle"`           |
| `number`                 | Numeric literals              | `42`, `3.14`                      |
| `boolean`                | Boolean values                | `true`, `false`                   |

## 🧪 Development

### Prerequisites

- Node.js >= 16.0.0
- npm >= 7.0.0
- Git

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/prism-lang-fml.git
cd prism-lang-fml
```

2. Install dependencies:

```bash
npm install
```

3. Start development:

```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development mode with watch
- `npm run build` - Build production files
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm run test:visual` - Open visual test page

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development workflow
- Submitting pull requests
- Reporting issues

## 🐛 Issues

Found a bug or have a feature request? Please check [existing issues](https://github.com/yourusername/prism-lang-fml/issues) first, then [open a new issue](https://github.com/yourusername/prism-lang-fml/issues/new/choose) if needed.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Prism.js](https://prismjs.com) team for the excellent syntax highlighter
- [HL7 FHIR](https://hl7.org/fhir/) community for the FHIR specification
- [FHIR Mapping Language](https://build.fhir.org/mapping-language.html) specification authors
- Contributors and maintainers
- Healthcare interoperability community

## 📚 Resources

### FML Language Resources

- [FHIR Mapping Language Specification](https://build.fhir.org/mapping-language.html)
- [FHIR Mapping Language Grammar](https://build.fhir.org/mapping.g4)
- [FHIR Mapping Tutorial](https://build.fhir.org/mapping-tutorial.html)
- [StructureMap Resource](https://build.fhir.org/structuremap.html)
- [FHIRPath Specification](http://hl7.org/fhirpath/)

### Prism.js Resources

- [Prism.js Documentation](https://prismjs.com/docs/)
- [Creating a Prism.js Language Definition](https://prismjs.com/extending.html#language-definitions)
- [Language Definition Examples](https://github.com/PrismJS/prism/tree/master/components)

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/prism-lang-fml)
- [GitHub Repository](https://github.com/yourusername/prism-lang-fml)
- [Issue Tracker](https://github.com/yourusername/prism-lang-fml/issues)
- [Discussions](https://github.com/yourusername/prism-lang-fml/discussions)

### 📊 Implementation Status

- ✅ **Language Definition**: Complete FML syntax support with 15+ token types
- ✅ **Testing**: 50+ comprehensive test cases covering all FML features
- ✅ **Documentation**: Complete language specification and usage examples
- ✅ **Performance**: Optimized regex patterns, no catastrophic backtracking
- ✅ **Visual Testing**: Interactive demo with theme switching and real-time testing
- ✅ **Build System**: Production-ready build pipeline with minification

### 🎯 Supported FML Features

- **Structure Definitions**: `map`, `uses`, `group`, `imports`, `extends`, `alias`, `conceptmap`
- **Mode Keywords**: `source`, `target`, `queried`, `produced`
- **Transformations**: `for`, `where`, `check`, `then`, `first`, `last`, `only_one`
- **Functions**: All 17+ built-in functions (`create`, `translate`, `cc`, `qty`, etc.)
- **Special Syntax**: Transformation arrows (`->`), rule labels, variable binding (`as`)
- **Data Types**: URLs, paths, strings, numbers, booleans
- **ConceptMaps**: Full prefix and mapping syntax support

Ready for FHIR developers building healthcare interoperability solutions! 🏥

---

**Status**: ✅ **Ready for Production** - Complete FML syntax highlighting implementation

partially developped with Claude Code