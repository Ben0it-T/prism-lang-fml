# Contributing to prism-lang-fml

First off, thank you for considering contributing to this Prism.js language plugin! 🎉

The following is a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Style Guides](#style-guides)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [project email].

### Our Pledge

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of level of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other similar characteristic.

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm (v6 or higher)
- Git
- A text editor (VS Code recommended)
- Basic knowledge of JavaScript and regular expressions

### Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/your-username/prism-lang-fml.git
cd prism-lang-fml
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/aphp/prism-lang-fml.git
```

4. Install dependencies:

```bash
npm install
```

5. Create a new branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**

- **Description**: Clear and concise description of the bug
- **Steps to Reproduce**: List of steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Code Sample**: Minimal code that reproduces the issue
- **Environment**: OS, Node version, Prism.js version
- **Screenshots**: If applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use Case**: Explain why this enhancement would be useful
- **Proposed Solution**: Describe the desired behavior
- **Alternatives Considered**: List any alternative solutions you've considered
- **Additional Context**: Add any other context or screenshots

### Submitting Pull Requests

1. **Check existing PRs and issues** first
2. **Follow the style guides** below
3. **Include tests** for new features
4. **Update documentation** as needed
5. **Write clear commit messages**

#### Pull Request Process

1. **Ensure all tests pass**:

```bash
npm test
```

2. **Lint your code**:

```bash
npm run lint
```

3. **Build the project**:

```bash
npm run build
```

4. **Update the README.md** with details of changes if needed

5. **Submit the PR** with a clear title and description

6. **Respond to feedback** promptly

### Pull Request Template

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] All tests pass
- [ ] Added new tests
- [ ] Manually tested

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Changes generate no warnings
```

## Development Process

### Language Definition Guidelines

When working on the language definition:

1. **Study existing Prism.js language definitions** for patterns
2. **Follow Prism.js conventions**:
   - Use appropriate token names
   - Keep patterns efficient
   - Avoid catastrophic backtracking
3. **Test thoroughly** with various code samples
4. **Document any special cases** or limitations

### Testing

#### Unit Tests

```bash
npm test
```

#### Visual Testing

```bash
npm run test:visual
# Opens a browser to manually test highlighting
```

#### Coverage

```bash
npm run test:coverage
```

### Building

```bash
# Development build
npm run build:dev

# Production build (minified)
npm run build
```

## Style Guides

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or corrections
- `chore:` Maintenance tasks

Examples:

```
feat: add support for multiline comments
fix: resolve issue with string escaping
docs: update installation instructions
```

### JavaScript Style Guide

- Use ES6+ features where appropriate
- 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add JSDoc comments for functions
- Keep lines under 100 characters

Example:

```javascript
/**
 * Processes a token pattern
 * @param {string} pattern - The pattern to process
 * @returns {RegExp} The compiled regular expression
 */
function processPattern(pattern) {
  return new RegExp(pattern, 'g');
}
```

### Regular Expression Guidelines

When writing patterns for the language definition:

1. **Optimize for performance**: Avoid backtracking
2. **Use non-capturing groups**: `(?:...)` when you don't need the match
3. **Be specific**: Avoid overly broad patterns
4. **Test edge cases**: Empty strings, special characters, etc.
5. **Comment complex patterns**:

```javascript
// Matches string literals with escaped characters
string: {
  pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
  greedy: true
}
```

## Project Structure Guidelines

### File Organization

- `src/`: Source code only
- `test/`: All test files and fixtures
- `examples/`: Working examples
- `dist/`: Built files (don't commit)
- `docs/`: Additional documentation

### Naming Conventions

- Files: `kebab-case.js`
- Classes: `PascalCase`
- Functions/Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS classes: `kebab-case`

## Documentation

### Code Documentation

- Add JSDoc comments for all public functions
- Include examples in complex functions
- Document regex patterns
- Update LANGUAGE_SPEC.md when changing language rules

### README Updates

Update the README when:

- Adding new features
- Changing installation steps
- Modifying usage instructions
- Adding new development commands

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a GitHub release
4. Publish to npm (maintainers only)

## Community

### Getting Help

- Check the [documentation](docs/)
- Search [existing issues](https://github.com/aphp/prism-lang-fml/issues)
- Ask in [Discussions](https://github.com/aphp/prism-lang-fml/discussions)
- Contact maintainers

### Recognition

Contributors will be recognized in:

- The project README
- GitHub's contributor graph
- Release notes for significant contributions

## Questions?

Feel free to open an issue with the `question` label or start a discussion!

---

Thank you for contributing! 🙏
