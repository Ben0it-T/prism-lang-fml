# Language Specification

## Overview

This document defines the specification for the FHIR Mapping Language (FML) supported by the Prism.js plugin.

FHIR Mapping Language is a domain-specific language designed for transforming data between different formats in healthcare systems, with a particular focus on FHIR (Fast Healthcare Interoperability Resources) transformations. FML enables declarative specification of mappings between source and target structures, supporting complex transformations, conditional logic, and type conversions.

> **Version**: FML v5.0.0 (FHIR R5)
> **FHIR Version**: R4 (4.0.1) and R5 (5.0.0)
> **Plugin Version**: 0.1.0

## Language Features

### Comments

The language supports two types of comments:

1. **Single-line comments**: Begin with `//` and continue to the end of the line

   ```fml
   // This is a single-line comment
   src.name as s -> tgt.name = s;  // Comment at end of line
   ```

2. **Multi-line comments**: Enclosed between `/*` and `*/`
   ```fml
   /* This is a
      multi-line comment */
   ```

### String Literals

FML supports string literals in the following contexts:

- **Single-quoted strings**: `'text'`
  - Used for constant values and string literals
  - Example: `tgt.status = 'active';`

- **Double-quoted strings**: `"text"`
  - Used for string values and identifiers with special characters
  - Example: `"Patient.name" : for src.name as s make tgt.name as t`

- **Escape sequences**: Standard escape sequences are supported (`\'`, `\"`, `\\`, `\n`, `\t`)

### Numeric Literals

- **Integers**: `42`, `0`, `-15`
- **Decimals**: `3.14`, `0.5`, `-2.7`
- **Boolean literals**: `true`, `false`

### Keywords

#### Structure Keywords

Reserved words that define mapping structures:

- `map` - Declares a mapping
- `uses` - Declares structure definitions
- `as` - Type/mode specification
- `alias` - Creates an alias for a structure
- `imports` - Import other maps
- `group` - Defines a transformation group
- `extends` - Group inheritance
- `default` - Default values
- `conceptmap` - ConceptMap prefix

#### Mode Keywords

Keywords for parameter modes:

- `source` - Source structure mode
- `target` - Target structure mode
- `queried` - Queried structure mode
- `produced` - Produced structure mode

#### Transformation Keywords

Keywords for transformation operations:

- `for` - Iteration over elements
- `where` - Conditional filtering
- `check` - Validation check
- `then` - Sequential operations
- `first` - First element
- `last` - Last element
- `share` - Shared variable
- `collate` - Collection operation
- `only_one` - Single element assertion
- `not_first` - Skip first element
- `not_last` - Skip last element

#### Function Keywords

Built-in transformation functions:

- `create` - Create new instance
- `copy` - Copy value
- `truncate` - Truncate string
- `escape` - Escape string
- `cast` - Type casting
- `append` - Append to string/list
- `translate` - Code translation
- `reference` - Create reference
- `dateOp` - Date operation
- `uuid` - Generate UUID
- `pointer` - JSON pointer
- `evaluate` - FHIRPath evaluation
- `cc` - Create Coding
- `c` - Create code
- `qty` - Create Quantity
- `id` - Create Identifier
- `cp` - Create ContactPoint

### Operators

#### Assignment Operators

- Simple assignment: `=`
  ```fml
  tgt.status = 'active';
  ```
- Transform assignment: `->`
  ```fml
  src.name as s -> tgt.name = s;
  ```

#### Path Operators

- Dot notation: `.`
  ```fml
  src.patient.name
  ```
- Function call: `()`
  ```fml
  src.value as v -> tgt.value = truncate(v, 10);
  ```

#### Logical Operators

- AND: `and`
- OR: `or`
- NOT: `not`
- Equality: `=`
- Inequality: `!=`
- Comparison: `<`, `>`, `<=`, `>=`

### Special Symbols

#### Mapping Syntax

- `->` - Rule transformation arrow
  ```fml
  src.field -> tgt.field;
  ```
- `:` - Rule label separator
  ```fml
  "rule-name" : src.field -> tgt.field;
  ```
- `;` - Statement terminator
- `,` - Parameter separator
- `( )` - Parameter/argument grouping
- `{ }` - Group body delimiters
- `<<` `>>` - Type markers for conceptmap

#### Variable Binding

- `as` - Variable binding
  ```fml
  src.name as srcName -> tgt.name = srcName;
  ```

#### List Operations

- `first` - First element of list
- `last` - Last element of list
- `only_one` - Assert single element

## Token Precedence

When multiple patterns could match the same text, the following precedence order is applied:

1. Comments (single-line and multi-line)
2. String literals (single and double quoted)
3. Structure keywords (map, uses, group, etc.)
4. Mode keywords (source, target, queried, produced)
5. Transformation keywords (for, where, check, then)
6. Function names (create, copy, translate, etc.)
7. Operators (->)
8. Rule labels ("rulename" :)
9. Numeric literals
10. Boolean literals (true, false)
11. Paths (with dots)
12. Variables and identifiers
13. Delimiters and punctuation

## Special Constructs

### Map Declaration

Top-level mapping definition:

```fml
map "http://example.org/fhir/StructureMap/Example" = "Example"

uses "http://hl7.org/fhir/StructureDefinition/Patient" alias Patient as source
uses "http://hl7.org/fhir/StructureDefinition/Bundle" alias Bundle as target

imports "http://example.org/fhir/StructureMap/Common"
```

### Group Definition

Transformation groups with parameters:

```fml
group Patient(source src : Patient, target tgt : Bundle) {
  src.id as id -> tgt.entry as entry, entry.resource = create('Patient') as patient then {
    src -> patient.id = id;
  };
}

// Group with extends
group ExtendedPatient(source src, target tgt) extends Patient {
  src.additionalField -> tgt.additionalField;
}
```

### Rule Syntax

Different rule patterns:

```fml
// Simple copy
src.field -> tgt.field;

// Copy with variable
src.field as s -> tgt.field = s;

// Conditional rule
src.field as s where s.exists() -> tgt.field = s;

// Multiple targets
src -> tgt.field1 = 'value1', tgt.field2 = 'value2';

// Labeled rule
"copy-status" : src.status -> tgt.status;

// Check rule
src.required as r check r.exists() -> tgt.required = r;
```

### Function Calls

Built-in function usage:

```fml
// String functions
src.text as t -> tgt.text = truncate(t, 100);
src.code as c -> tgt.display = translate(c, 'http://example.org/ConceptMap/map1', 'display');

// Type creation
src -> tgt.coding = cc('http://snomed.info/sct', '123456', 'Display text');
src -> tgt.quantity = qty(5, 'mg');

// Reference creation
src.patientId as id -> tgt.patient = reference('Patient', id);

// Date operations
src.date as d -> tgt.effectiveDate = dateOp(d, '+', 1, 'day');

// Evaluation
src -> tgt.calculated = evaluate(src, 'valueQuantity.value * 2');
```

### Conditional Logic

```fml
// Where clause
src.gender as g where g = 'male' -> tgt.genderCode = 'M';
src.gender as g where g = 'female' -> tgt.genderCode = 'F';

// Complex conditions
src.value as v where v > 10 and v < 100 -> tgt.range = 'normal';

// Default values
src.status as s -> tgt.status = s;
src where src.status.empty() -> tgt.status = 'unknown';
```

### List Processing

```fml
// Iterate over list
src.name as name -> tgt.name as tname then {
  name.given first as g -> tname.first = g;
  name.family -> tname.last;
};

// Collection operations
src.identifier only_one as id -> tgt.id = id;
src.address not_first as addr -> tgt.additionalAddress = addr;
```

### ConceptMap Integration

```fml
conceptmap "GenderMap" {
  prefix s = "http://hl7.org/fhir/administrative-gender"
  prefix t = "http://example.org/gender"

  s:male == t:M
  s:female == t:F
  s:other == t:O
  s:unknown == t:U
}

// Using conceptmap in transformation
src.gender as g -> tgt.genderCode = translate(g, '#GenderMap', 'code');
```

## Edge Cases

### Nested Comments

Multi-line comments cannot be nested:

```fml
/* Valid comment /* This part is text, not a nested comment */ still in comment */
```

### String Escapes

Escape sequences in strings:

```fml
src.text -> tgt.text = 'Line 1\nLine 2';
src.quote -> tgt.quote = 'He said \'Hello\'';
```

### Reserved Words as Identifiers

FML keywords in paths require special handling:

```fml
src.group -> tgt.group;  // 'group' here is a field name, not keyword
```

### Complex Path Expressions

```fml
src.contact.where(relationship.coding.where(system = 'http://example.org').exists())
```

### Empty Rules

```fml
// Valid empty then block
src.name as n -> tgt.name as tn then {
  // Rules will be added later
};
```

## Performance Considerations

1. **Regex Optimization**: All patterns are optimized to avoid catastrophic backtracking
   - Path patterns use possessive quantifiers where possible
   - Function patterns are anchored to word boundaries

2. **Greedy Matching**: String and comment patterns use appropriate greedy/lazy matching
   - String patterns terminate at first unescaped quote
   - Multi-line strings handled with `[\s\S]*?`

3. **Token Order**: More specific patterns precede general ones
   - `->` matched before `-`
   - Function keywords before general identifiers

4. **Lookahead/Lookbehind**: Used sparingly for context-sensitive tokens
   - Rule labels require `:` lookahead
   - Function calls require `(` lookahead

5. **State Management**: Minimal state tracking for nested structures

## Compatibility

### FML Versions

- FHIR STU3: Basic support
- FHIR R4: Full support
- FHIR R5: Complete support with all features

### FHIR Versions

- FHIR STU3 (3.0.x): Limited support
- FHIR R4 (4.0.1): Full support
- FHIR R4B (4.3.0): Full support
- FHIR R5 (5.0.0): Full support

### PrismJS Versions

- PrismJS 1.x: Compatible with 1.15+

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Examples

### Complete Example

```fml
/// url = "http://hl7.org/fhir/StructureMap/PatientToBundle"
/// name = "PatientToBundle"
/// title = "Patient to Bundle Transformation"
/// status = "draft"

map "http://hl7.org/fhir/StructureMap/PatientToBundle" = "PatientToBundle"

// ===============================================
// Structure Definitions
// ===============================================

uses "http://hl7.org/fhir/StructureDefinition/Patient" alias Patient as source
uses "http://hl7.org/fhir/StructureDefinition/Bundle" alias Bundle as target
uses "http://hl7.org/fhir/StructureDefinition/Observation" alias Observation as produced

imports "http://hl7.org/fhir/StructureMap/CommonFunctions"

// ===============================================
// ConceptMap for Gender Translation
// ===============================================

conceptmap "GenderMap" {
  prefix s = "http://hl7.org/fhir/administrative-gender"
  prefix t = "http://example.org/codes/gender"

  s:male == t:M "Male"
  s:female == t:F "Female"
  s:other == t:O "Other"
  s:unknown == t:U "Unknown"
}

// ===============================================
// Main Transformation Group
// ===============================================

group PatientToBundle(source src : Patient, target tgt : Bundle) {
  // Set bundle type
  src -> tgt.type = 'collection';

  // Set bundle identifier
  src -> tgt.identifier = uuid() as uuid,
         tgt.timestamp = now();

  // Create patient entry
  src -> tgt.entry as entry then {
    src -> entry.resource = create('Patient') as patient then
      TransformPatient(src, patient);
    src.id as id -> entry.fullUrl = append('Patient/', id);
  };

  // Process observations if they exist
  src.contained as contained where contained.is(Observation) ->
    tgt.entry as obsEntry then {
      contained -> obsEntry.resource = contained;
      contained.id as id -> obsEntry.fullUrl = append('Observation/', id);
    };
}

// ===============================================
// Patient Transformation Rules
// ===============================================

group TransformPatient(source src : Patient, target tgt : Patient) {
  // Copy identifier
  src.identifier -> tgt.identifier;

  // Transform name
  src.name as sname -> tgt.name as tname then TransformHumanName(sname, tname);

  // Transform gender with ConceptMap
  src.gender as g -> tgt.gender = translate(g, '#GenderMap', 'code');

  // Copy and validate birthDate
  src.birthDate as bd check bd.matches('\\d{4}-\\d{2}-\\d{2}') ->
    tgt.birthDate = bd;

  // Process telecom
  src.telecom as st -> tgt.telecom as tt then {
    st.system -> tt.system;
    st.value -> tt.value;
    st.use -> tt.use;
    st where st.rank.exists() -> tt.rank = st.rank;
    st where st.period.exists() -> tt.period = st.period;
  };

  // Transform address
  src.address as saddr -> tgt.address as taddr then TransformAddress(saddr, taddr);

  // Handle marital status
  src.maritalStatus as ms -> tgt.maritalStatus = cc(
    'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    ms.coding.first().code,
    ms.coding.first().display
  );

  // Process contact
  src.contact as sc -> tgt.contact as tc then {
    sc.relationship -> tc.relationship;
    sc.name as scname -> tc.name as tcname then TransformHumanName(scname, tcname);
    sc.telecom -> tc.telecom;
    sc.address as scaddr -> tc.address as tcaddr then TransformAddress(scaddr, tcaddr);
  };

  // Extension handling
  src.extension as ext where ext.url = 'http://example.org/ethnicity' ->
    tgt.extension as text, text.url = ext.url, text.value = ext.value;

  // Meta information
  src -> tgt.meta = create('Meta') as meta then {
    src -> meta.lastUpdated = now();
    src -> meta.profile = 'http://example.org/StructureDefinition/MyPatient';
  };
}

// ===============================================
// Name Transformation Group
// ===============================================

group TransformHumanName(source src, target tgt) {
  src.use -> tgt.use;
  src.text -> tgt.text;

  // Process family name
  src.family as sf -> tgt.family = upper(sf);

  // Process given names
  src.given first as g1 -> tgt.given = g1;
  src.given not_first as gn -> tgt.given = gn;

  // Handle prefix and suffix
  src.prefix -> tgt.prefix;
  src.suffix -> tgt.suffix;

  // Period
  src.period -> tgt.period;
}

// ===============================================
// Address Transformation Group
// ===============================================

group TransformAddress(source src, target tgt) {
  src.use -> tgt.use;
  src.type -> tgt.type;

  // Combine line elements
  src.line as line -> tgt.line = line;

  // Process city, state, postal code
  src.city as city -> tgt.city = initCap(city);
  src.state -> tgt.state;
  src.postalCode as pc where pc.matches('\\d{5}(-\\d{4})?') -> tgt.postalCode = pc;

  // Country code standardization
  src.country as c where c = 'USA' -> tgt.country = 'US';
  src.country as c where c != 'USA' -> tgt.country = c;

  // Period
  src.period -> tgt.period;
}

// ===============================================
// Utility Groups
// ===============================================

group ProcessExtensions(source src, target tgt) {
  // Simple extensions
  src.extension as ext where ext.value.exists() ->
    tgt.extension as text then {
      ext.url -> text.url;
      ext.value -> text.value;
    };

  // Complex extensions
  src.extension as ext where ext.extension.exists() ->
    tgt.extension as text then {
      ext.url -> text.url;
      ext.extension as nested -> text.extension as tnested then
        ProcessExtensions(nested, tnested);
    };
}

// ===============================================
// Date Utility Group
// ===============================================

group ProcessDates(source src, target tgt) {
  // Date validation and transformation
  src.date as d where d.matches('\\d{4}-\\d{2}-\\d{2}') -> tgt.date = d;
  src.dateTime as dt where dt.matches('\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}') ->
    tgt.dateTime = dt;

  // Period handling
  src.period as period -> tgt.period as tperiod then {
    period.start as s -> tperiod.start = s;
    period.end as e where e > s -> tperiod.end = e;
  };
}
```

## Future Extensions

### Planned Features

1. **Enhanced type system**: Stronger type checking and inference
2. **Macro support**: Reusable transformation patterns
3. **External function calls**: Integration with external transformation functions
4. **Streaming support**: Large dataset transformations
5. **Validation rules**: Built-in FHIR validation during transformation
6. **Debug mode**: Step-through transformation execution

### Syntax Evolution

- Support for FHIR R6 when released
- GraphQL integration for queries
- JSONPath support alongside FHIRPath
- Async transformation operations
- Parallel processing directives

### Tool Integration

- Source mapping for debugging
- IDE integration markers
- Performance profiling hints
- Test framework integration
- Documentation generation

## References

1. [FHIR Mapping Language Specification](https://build.fhir.org/mapping-language.html)
2. [FHIR Mapping Language Grammar](https://build.fhir.org/mapping.g4)
3. [FHIR Mapping Tutorial](https://build.fhir.org/mapping-tutorial.html)
4. [StructureMap Resource](https://build.fhir.org/structuremap.html)
5. [FHIRPath Specification](http://hl7.org/fhirpath/)
6. [HL7 FHIR Specification](https://www.hl7.org/fhir/)
7. [PrismJS Documentation](https://prismjs.com/docs/)
8. [FHIR Mapping Language Implementation Guide](https://www.hl7.org/fhir/mapping-language.html)
