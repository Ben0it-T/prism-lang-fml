# FML Token Mapping to FHIR Implementation Guide Visual Concepts

## Overview

This document maps FHIR Mapping Language (FML) syntax elements to FHIR Implementation Guide (IG) visual styling standards. The color scheme and visual hierarchy are designed to integrate seamlessly with HL7's official IG templates while providing clear, distinctive highlighting for FML-specific constructs.

## Color Palette Analysis

Based on analysis of FHIR IG reference stylesheets:

### Primary FHIR IG Colors

- **FHIR Primary Blue**: `#428bca` - Core FHIR branding
- **HL7 Brand Gray**: `#505050` - Navigation and headers
- **STU Note Background**: `#fff2ff` - Special documentation
- **STU Note Border**: `#ffa0ff` - Attention borders
- **Success Green**: `#5cb85c` - Positive states
- **Warning Yellow**: `#f0ad4e` - Cautionary elements
- **Danger Red**: `#d9534f` - Error states
- **Info Blue**: `#5bc0de` - Informational content

### Standard Prism Colors

- **Comment**: `slategray` - Muted documentation
- **String**: `#690` - Literal values
- **Keyword**: `#07a` - Language keywords
- **Function**: `#DD4A68` - Function names
- **Operator**: `#9a6e3a` - Operators and symbols
- **Property**: `#905` - Object properties
- **Number**: `#905` - Numeric literals
- **Punctuation**: `#999` - Structural elements

## FML Token Mapping

### Core Language Structure

| FML Token                | FHIR IG Color                  | Rationale                                           |
| ------------------------ | ------------------------------ | --------------------------------------------------- |
| `metadata-comment`       | `#fff2ff` bg, `#ffa0ff` border | Aligns with STU Note styling for important metadata |
| `structure-keyword`      | `#428bca`                      | Uses FHIR primary blue for core structural elements |
| `mode-keyword`           | `#5bc0de`                      | Info blue distinguishes mode declarations           |
| `transformation-keyword` | `#07a`                         | Standard keyword blue for transformation logic      |

### Functional Elements

| FML Token              | FHIR IG Color | Rationale                                             |
| ---------------------- | ------------- | ----------------------------------------------------- |
| `function`             | `#DD4A68`     | Standard Prism function color for built-in operations |
| `transformation-arrow` | `#9a6e3a`     | Operator color emphasizes data flow direction         |
| `variable-binding`     | `#07a`        | Keyword treatment for 'as' binding syntax             |
| `conceptmap-operator`  | `#9a6e3a`     | Operator color for ConceptMap relationships           |

### Data and References

| FML Token    | FHIR IG Color     | Rationale                                |
| ------------ | ----------------- | ---------------------------------------- |
| `rule-label` | `#905`            | Property color for rule identification   |
| `url`        | `#690` underlined | String color with emphasis for URLs      |
| `path`       | `#905`            | Property color for FHIR path expressions |
| `string`     | `#690`            | Standard string color for literals       |
| `boolean`    | `#905`            | Constant color for true/false values     |
| `number`     | `#905`            | Constant color for numeric values        |

### Support Elements

| FML Token     | FHIR IG Color | Rationale                              |
| ------------- | ------------- | -------------------------------------- |
| `comment`     | `slategray`   | Standard muted color for documentation |
| `operator`    | `#9a6e3a`     | Consistent operator styling            |
| `punctuation` | `#999`        | Subtle color for structural syntax     |
| `identifier`  | inherit       | Default text color for variables       |

## Semantic Color Groupings

### 🔵 Blue Family (Structure & Keywords)

- **Primary Blue** (`#428bca`): Core FML structure (`map`, `uses`, `group`)
- **Info Blue** (`#5bc0de`): Mode specifications (`source`, `target`)
- **Keyword Blue** (`#07a`): Transformation logic (`for`, `where`, `as`)

### 🟣 Purple Family (Properties & Constants)

- **Property Purple** (`#905`): Rule labels, paths, numbers, booleans

### 🟢 Green Family (Literals)

- **String Green** (`#690`): All string literals and URLs

### 🟠 Orange Family (Operations)

- **Operator Amber** (`#9a6e3a`): Arrows, operators, ConceptMap relations

### 🩷 Pink Family (Functions)

- **Function Pink** (`#DD4A68`): Built-in transformation functions

### ⚪ Neutral Colors

- **Comment Gray** (`slategray`): Documentation and comments
- **Punctuation Gray** (`#999`): Structural syntax elements

## Visual Hierarchy

### Primary Level (Most Prominent)

1. **Metadata Comments** - Pink background for immediate attention
2. **Structure Keywords** - FHIR blue for document organization
3. **Functions** - Pink text for operation identification

### Secondary Level (Important Context)

1. **Mode Keywords** - Info blue for data flow context
2. **Transformation Keywords** - Standard blue for logic flow
3. **Transformation Arrows** - Amber for data mapping direction

### Tertiary Level (Supporting Information)

1. **Rule Labels** - Purple for rule identification
2. **Paths** - Purple for FHIR element references
3. **URLs** - Green with underline for external references

### Quaternary Level (Basic Elements)

1. **Strings** - Green for literal values
2. **Numbers/Booleans** - Purple for constants
3. **Operators** - Amber for relationships
4. **Punctuation** - Gray for structure

## Integration with FHIR IG Themes

### Light Theme (Default)

All colors specified above work optimally with FHIR IG light backgrounds (`#ffffff` to `#f5f5f5`).

### Print Styles

- Reduce color saturation by 20%
- Ensure minimum 4.5:1 contrast ratio
- Use bold/italic for distinction when color is unavailable

### Accessibility Compliance

- All color combinations meet WCAG 2.1 AA standards
- Alternative styling provided for color-blind users
- High contrast mode support included

## Example Color Application

```fml
/// url = 'http://example.org/map'          ← Pink background (metadata)
/// name = 'PatientTransform'               ← Pink background (metadata)

map "PatientTransform" = "Transform"        ← Blue 'map', Purple label

uses "http://hl7.org/fhir/Patient" alias Patient as source  ← Blue keywords, Green URL
uses "http://hl7.org/fhir/Bundle" alias Bundle as target    ← Blue keywords, Green URL

group TransformPatient(source src : Patient, target tgt : Bundle) {  ← Blue 'group'
  // Copy patient identifier                ← Gray comment
  "copy-id" : src.id as id -> tgt.id = id   ← Purple label, Purple paths, Amber arrow

  // Transform with function                ← Gray comment
  src.name as n -> tgt.display = translate(n, "map", "display")  ← Pink function
}
```

## CSS Implementation Strategy

### Base Structure

```css
/* FML-specific token styling aligned with FHIR IG */
pre.language-fml .token.metadata-comment {
  background-color: #fff2ff;
  border-left: 4px solid #ffa0ff;
  /* Additional STU Note styling */
}

pre.language-fml .token.structure-keyword {
  color: #428bca;
  font-weight: 600;
}
```

### Theme Variants

- **Light Theme**: Full color implementation
- **Dark Theme**: Adjusted colors for dark backgrounds
- **Print Theme**: High contrast, reduced color
- **High Contrast**: Maximum accessibility compliance

## Testing and Validation

### Visual Compatibility Tests

1. **FHIR IG Integration**: Test within actual IG environments
2. **Theme Consistency**: Verify across light/dark themes
3. **Accessibility**: Validate contrast ratios and screen reader compatibility
4. **Print Quality**: Ensure readability in printed documentation

### Browser Compatibility

- Chrome/Edge (Chromium-based)
- Firefox
- Safari
- Internet Explorer 11+ (if required)

## Migration from Generic Prism

### Breaking Changes

- Custom token types require updated CSS
- New color scheme may affect existing implementations

### Backward Compatibility

- Maintains compatibility with standard Prism token classes
- Graceful degradation when FML-specific styles unavailable

## Future Enhancements

### Planned Features

1. **Semantic Highlighting**: Context-aware coloring based on FHIR resource types
2. **Interactive Elements**: Hover states for function documentation
3. **Error Highlighting**: Integration with FML validation tools
4. **Theme Customization**: CSS custom properties for IG-specific branding

### Community Feedback Integration

- Color preference surveys from FHIR community
- Accessibility feedback from visually impaired users
- Integration testing with popular FHIR IG tools

---

## References

1. [HL7 FHIR Implementation Guide Template](https://github.com/HL7/ig-template-base)
2. [FHIR Mapping Language Specification](http://hl7.org/fhir/mapping-language.html)
3. [Prism.js Documentation](https://prismjs.com/docs/)
4. [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
5. [HL7 Visual Identity Guidelines](https://www.hl7.org/about/brand.cfm)

---

_This mapping ensures FML syntax highlighting integrates seamlessly with FHIR Implementation Guide environments while maintaining optimal readability and accessibility._
