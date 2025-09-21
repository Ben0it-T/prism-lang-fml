<goal>
Develop a PrismJS syntax highlighting plugin for FHIR Mapping Language (FML) that provides accurate and comprehensive syntax highlighting for .fml files.
</goal>
<context>
The project already exists with a claude.md context file that can be adapted. The plugin should follow PrismJS conventions and patterns while accurately representing FML syntax structure.
</context>
<technical-specification>

## FML Language Overview

FHIR Mapping Language (FML) is a domain-specific language for transforming data between different FHIR resource formats. You find language specification: `docs/LANGUAGE_SPEC.md`.

## Examples to Test Against

```fml

/// url = 'https://example.org/fhir/StructureMap/PatientTransform'
/// name = 'PatientTransformation'
/// status = 'active'

uses "http://hl7.org/fhir/StructureDefinition/Patient" alias SourcePatient as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" alias TargetPatient as target

group TransformPatient(source src : SourcePatient, target tgt : TargetPatient) {
  src.id as srcId -> tgt.id = srcId "copyId";
  src.name as srcName where ($this.use = 'official') -> tgt.name = srcName "copyOfficialName";
  src.birthDate as bd -> tgt.birthDate = bd "copyBirthDate";
  src.identifier as id where ($this.system = 'http://example.org/mrn') then {
    id -> tgt.identifier = create('Identifier') as newId then {
      id.value as v -> newId.value = v "setValue";
      id -> newId.system = 'http://newexample.org/mrn' "setSystem";
    } "createNewIdentifier";
  } "processIdentifier";
}
```

</technical-specification>
<instruction>

### Phase 1: Analysis and Preparation

1. Examine the existing `claude.md` file
2. Adapt it to include FML-specific documentation in `docs/LANGUAGE_SPEC.md`
3. Analyze FML examples provided in `/examples/`
4. Identify additional syntactic patterns not documented
5. Review official FML specification for edge cases

### Phase 2: Plugin Development

1. Use `src/prism-lang-fml.js` with complete structure
2. Implement recognition for all syntactic elements
3. Handle special cases and token nesting
4. Optimize regex patterns for performance
5. Ensure proper token precedence and greedy matching

### Phase 3: Testing and Validation

1. Create `test/visual.html` with comprehensive demo page
2. Include all identified use cases
3. Test with provided examples
4. Verify correct highlighting of each element
5. Test edge cases and complex nesting scenarios
6. Validate performance with large FML files

### Phase 4: Documentation

1. Create detailed README.md
2. Document installation and usage
3. Provide CSS customization examples
4. List available tokens and their usage
5. Include troubleshooting section
   </instruction>
   <recommandation>

## Expected Deliverables

1. **Functional Plugin**: Complete and optimized `prism-lang-fml.js`
2. **Comprehensive Tests**: HTML demo page with all use cases
3. **Documentation**: Detailed README.md with examples
4. **CSS Theme**: Theme file tailored for FML
5. **Package Configuration**: package.json with proper metadata
6. **Integration Guide**: Instructions for webpack/rollup integration
7. **Migration Guide**: For users coming from other highlighters

## Development Notes

- Prioritize code readability and maintainability
- Comment complex regex patterns thoroughly
- Design for extensibility for future FML versions
- Test compatibility with existing PrismJS themes
- Validate against real-world FML projects
- Implement proper error boundaries for malformed FML
- Support both minified and development versions

## Testing Checklist

- [ ] All keywords properly highlighted
- [ ] Cardinalities recognized correctly
- [ ] Paths with brackets and slices work
- [ ] Code systems and codes display properly
- [ ] Strings with escape sequences handled
- [ ] Comments don't break other tokens
- [ ] Aliases resolved correctly
- [ ] RuleSet insertions highlighted
- [ ] Binding strengths displayed
- [ ] URLs clickable where appropriate
- [ ] Performance acceptable for large files
- [ ] Works with different PrismJS themes
- [ ] No conflicts with other language plugins
- [ ] Minified version works correctly
- [ ] Documentation examples all work
      </recommandation>
      <exemple>
      </exemple>
      <output>
      The plugin will be considered complete when it:

1. Correctly highlights all FML language constructs
2. Performs well on files up to 10,000 lines
3. Integrates seamlessly with existing PrismJS installations
4. Provides clear visual distinction between token types
5. Includes comprehensive documentation and examples
6. Passes all test cases without errors
7. Works across modern browsers (Chrome, Firefox, Safari, Edge)
   </output>

Please implement this plugin following PrismJS best practices and ensure it provides clear, distinctive highlighting for all FML language elements.
