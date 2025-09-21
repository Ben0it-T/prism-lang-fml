# Claude Code Development Guide

This guide provides best practices and instructions for developing this Prism.js plugin with Claude Code assistance.

## 🤖 About Claude Code Integration

This project is optimized for development with Claude Code, enabling AI-assisted coding for creating and maintaining the Prism.js language definition plugin.

## 📋 Project Context for Claude

### Project Overview

- **Type**: Prism.js language definition plugin
- **Purpose**: Syntax highlighting for a FHIR Mapping Language (FML)
- **Framework**: Prism.js extension
- **License**: MIT
- **Standards**: GitHub best practices, conventional commits

### Key Technical Requirements

1. **Prism.js Compatibility**: Must follow Prism.js plugin architecture
2. **Performance**: Regex patterns must avoid catastrophic backtracking
3. **Testing**: Comprehensive test coverage required
4. **Documentation**: Clear documentation for users and contributors
5. **Browser Support**: ES6+ with fallbacks if needed

## 🎯 Development Tasks for Claude

### 1. Language Definition Creation

When creating the language definition with Claude:

```markdown
Task: Create a Prism.js language definition for [LANGUAGE_NAME]

Context:

- Language paradigm: [procedural/functional/object-oriented]
- Similar to: [existing languages for reference]
- Key features: [list unique syntax features]

Requirements:

1. Define token patterns for:
   - Comments (single-line, multi-line)
   - Strings (with escape sequences)
   - Keywords
   - Operators
   - Functions/methods
   - Variables/identifiers
   - Numbers (integers, floats, etc.)
   - Special constructs

2. Follow Prism.js conventions:
   - Use appropriate token names
   - Implement 'greedy' flag where needed
   - Handle edge cases

3. Optimize patterns for performance
```

### 2. Pattern Writing Guidelines

When asking Claude to write regex patterns:

```markdown
Task: Write a regex pattern for [FEATURE]

Requirements:

- Must handle: [list all cases]
- Must NOT match: [list exclusions]
- Performance: Avoid backtracking
- Use non-capturing groups where possible

Examples to match:

- [example 1]
- [example 2]

Examples to NOT match:

- [counter-example 1]
- [counter-example 2]
```

### 3. Test Generation

For comprehensive test creation:

```markdown
Task: Generate test cases for [LANGUAGE_NAME] syntax highlighting

Include tests for:

1. Basic tokens (keywords, operators, etc.)
2. Complex constructs (nested structures)
3. Edge cases (empty, malformed)
4. Performance cases (long strings, deep nesting)
5. Common patterns from real code

Format:

- Input code
- Expected token structure
- Visual verification HTML
```

### 4. Documentation Templates

When creating documentation with Claude:

```markdown
Task: Document the [FEATURE/API/USAGE]

Include:

1. Purpose and overview
2. Syntax/API reference
3. Code examples (at least 3)
4. Common use cases
5. Troubleshooting
6. Performance considerations
```

## 🔧 Development Workflow with Claude

### Initial Setup Phase

1. **Define the Language Specification**

```markdown
Claude, help me define the language specification for FHIR Mapping Language:

- Provide a comprehensive list of language features
- Identify unique syntax elements
- Suggest token categories needed
```

2. **Create Core Language Definition**

```markdown
Claude, create the initial prism-lang-fml.js file with:

- Basic token definitions
- Pattern implementations
- Prism.js registration code
```

3. **Generate Test Suite**

```markdown
Claude, generate comprehensive test cases covering:

- All token types
- Edge cases
- Real-world code examples
```

### Iterative Development

1. **Pattern Refinement**

```markdown
Claude, this pattern [PATTERN] is matching incorrectly.
Current behavior: [description]
Expected behavior: [description]
Test case: [code sample]
Please provide a corrected pattern.
```

2. **Performance Optimization**

```markdown
Claude, analyze this regex pattern for performance issues:
[PATTERN]
Suggest optimizations to prevent backtracking.
```

3. **Feature Addition**

```markdown
Claude, add support for [FEATURE]:

- Syntax: [description]
- Examples: [code samples]
- Similar to: [reference from other language]
```

## 📝 Code Review Checklist for Claude

When reviewing code with Claude, check:

### Language Definition

- [ ] All token types are defined
- [ ] Patterns are efficient (no catastrophic backtracking)
- [ ] Greedy flag used appropriately
- [ ] Token precedence is correct
- [ ] Edge cases handled

### Testing

- [ ] Unit tests cover all tokens
- [ ] Visual tests render correctly
- [ ] Performance tests pass
- [ ] Edge cases tested
- [ ] Real-world examples work

### Documentation

- [ ] README is complete
- [ ] API documentation is clear
- [ ] Examples are working
- [ ] Language spec is detailed
- [ ] Comments explain complex patterns

### Code Quality

- [ ] ESLint passes
- [ ] Follows project conventions
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Performance optimized

## 🚀 Prompting Best Practices

### Effective Prompts for Claude

1. **Be Specific**

```markdown
❌ "Fix the string pattern"
✅ "The string pattern currently doesn't handle escaped quotes. Update it to match: 'It\'s working' and "She said \"Hello\""
```

2. **Provide Context**

```markdown
✅ "In the context of a Prism.js plugin, create a pattern that matches function declarations in FHIR Mapping Language, similar to JavaScript but with 'fn' keyword instead of 'function'"
```

3. **Include Examples**

```markdown
✅ "Create a pattern for comments that matches:

- Single line: // comment
- Multi-line: /_ comment _/
- Doc comments: /\*_ comment _/
  But NOT: http://url (the // in URLs)"
```

4. **Request Explanations**

```markdown
✅ "Explain why you chose this regex pattern and how it avoids backtracking"
```

## 🛠️ Common Tasks Reference

### Task 1: Add New Token Type

```markdown
Claude, add a new token type for [TOKEN_NAME]:

1. Define the pattern
2. Set appropriate precedence
3. Add test cases
4. Update documentation
```

### Task 2: Fix Pattern Conflict

```markdown
Claude, resolve pattern conflict:

- Pattern A: [pattern] matches [examples]
- Pattern B: [pattern] matches [examples]
- Conflict: Both match [example]
- Desired behavior: [description]
```

### Task 3: Optimize Performance

```markdown
Claude, optimize the language definition:

1. Identify potential performance issues
2. Suggest pattern improvements
3. Implement lazy quantifiers where appropriate
4. Combine similar patterns if possible
```

### Task 4: Generate Documentation

```markdown
Claude, generate documentation for:

1. Installation guide with all methods
2. Configuration options
3. API reference with examples
4. Troubleshooting section
5. Migration guide from similar plugins
```

## 📚 Resources for Claude

When working with Claude, reference these:

### Prism.js Documentation

- [Official Docs](https://prismjs.com/docs/)
- [Language Definition Guide](https://prismjs.com/extending.html#language-definitions)
- [Token Names Reference](https://prismjs.com/tokens.html)

### FHIR Mapping Language

- [FHIR Mapping Language Specification](https://build.fhir.org/mapping-language.html)
- [FHIR Mapping Language Grammar](https://build.fhir.org/mapping.g4)
- [FHIR Mapping Tutorial](https://build.fhir.org/mapping-tutorial.html)
- [StructureMap Resource](https://build.fhir.org/structuremap.html)
- [FHIRPath Specification](http://hl7.org/fhirpath/)
- [HL7 FHIR Specification](https://www.hl7.org/fhir/)
- [FHIR Mapping Language Implementation Guide](https://www.hl7.org/fhir/mapping-language.html)

### Regex Resources

- Use non-capturing groups: `(?:...)`
- Prefer lazy quantifiers: `*?`, `+?`
- Avoid nested quantifiers
- Use atomic groups when possible

### Pattern Examples from Prism.js

```javascript
// String with escapes
string: {
  pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
  greedy: true
}

// Comments
comment: [
  {
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true,
    greedy: true
  },
  {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  }
]

// Keywords
keyword: /\b(?:if|else|while|for|return|function)\b/
```

## 🎨 Style Preferences

When generating code with Claude:

### JavaScript Style

```javascript
// Preferred style
Prism.languages.fml = {
  comment: {
    pattern: /\/\/.*/,
    greedy: true
  },
  string: {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  keyword: /\b(?:if|else|while)\b/,
  operator: /[+\-*/%]=?|[<>]=?|==|&&|\|\|/,
  punctuation: /[{}[\];(),.:]/
};
```

### Test Style

```javascript
describe('Language Definition', () => {
  it('should highlight keywords', () => {
    const code = 'if (condition) { return true; }';
    const tokens = Prism.tokenize(code, Prism.languages.fml);

    expect(tokens[0].type).toBe('keyword');
    expect(tokens[0].content).toBe('if');
  });
});
```

## 🔍 Debugging with Claude

When debugging issues:

```markdown
Claude, debug this highlighting issue:

Input code:
```

[paste code]

````

Current output:
[describe what tokens are generated]

Expected output:
[describe what should be generated]

Language definition:
```javascript
[paste relevant part of definition]
````

Please identify the issue and provide a fix.

````

## 📈 Performance Optimization

Ask Claude to optimize patterns:

```markdown
Claude, analyze these patterns for performance:

```javascript
[paste language definition]
````

Please:

1. Identify patterns prone to backtracking
2. Suggest optimized versions
3. Explain the improvements
4. Provide benchmark comparisons if possible

````

## 🔄 Iteration Guidelines

### Version 1: MVP
- Basic token support
- Core language features
- Minimal viable highlighting

### Version 2: Enhanced
- Advanced language features
- Improved pattern accuracy
- Performance optimizations

### Version 3: Production
- Complete language coverage
- Extensive testing
- Full documentation
- Theme support

## 💡 Tips for Success

1. **Start Simple**: Begin with basic tokens, add complexity gradually
2. **Test Continuously**: Verify each pattern with multiple examples
3. **Document Patterns**: Comment complex regex with examples
4. **Benchmark Performance**: Test with large files
5. **Iterate Based on Feedback**: Refine patterns based on real usage

## 🆘 Troubleshooting with Claude

Common issues and how to ask for help:

### Pattern Not Matching
```markdown
Pattern [PATTERN] isn't matching [EXAMPLE].
Debug info: [any console output]
Please fix and explain the issue.
````

### Performance Issues

```markdown
The plugin is slow with [FILE SIZE] files.
Suspect patterns: [list patterns]
Please optimize for better performance.
```

### Token Conflicts

```markdown
Tokens [TOKEN1] and [TOKEN2] are conflicting.
Example: [code that shows conflict]
How should precedence be handled?
```

## 📦 Deployment Preparation

When ready to deploy, ask Claude:

```markdown
Claude, prepare the project for deployment:

1. Verify all files are complete
2. Check package.json configuration
3. Ensure build process works
4. Validate documentation
5. Create release checklist
```

---

## Quick Reference Card

### Essential Commands

```bash
npm run dev          # Development mode
npm test            # Run tests
npm run build       # Build for production
npm run lint        # Check code style
npm run test:visual # Visual testing
```

### File Locations

- Language definition: `src/prism-lang-fml.js`
- Tests: `test/prism-lang-fml.test.js`
- Examples: `examples/demo.html`
- Visual test: `test/visual.html`

### Commit Message Format

```
feat: add support for async functions
fix: correct string escaping issue
docs: update API documentation
test: add edge case tests
perf: optimize comment pattern
```

---

Remember: Claude Code is here to assist, but always review generated code, test thoroughly, and ensure it meets project standards!
