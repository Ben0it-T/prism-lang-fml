<goal>
Generate Map FML constructs to FHIR IG visual concepts
</goal>
<context>
FHIR Implementation Guides use a standardized set of stylesheets maintained by HL7. The FML syntax highlighter must align with these existing styles while providing clear, distinctive highlighting for FML-specific constructs.

## Reference Stylesheets to Analyze

### 1. bootstrap-fhir.css

- **URL**: https://github.com/HL7/ig-template-base/blob/master/content/assets/css/bootstrap-fhir.css
- **Key Elements to Extract**:
  - Color palette for FHIR resources
  - Font families and sizes
  - Spacing and padding conventions
  - Alert and warning styles
  - Table and list styling

### 2. hl7.css

- **URL**: https://github.com/HL7/ig-template-base/blob/master/content/assets/css/hl7.css
- **Key Elements to Extract**:
  - HL7 brand colors
  - Code block styling
  - Pre-formatted text appearance
  - Navigation and hierarchy styles
  - Print media queries

### 3. prism-fhirpath.css

- **URL**: https://github.com/HL7/ig-template-base/blob/master/content/assets/css/prism-fhirpath.css
- **Key Elements to Extract**:
  - FHIRPath token colors
  - Syntax highlighting patterns
  - Operator and keyword styling
  - Comment appearance
  - String literal formatting

### 4. prism.css

- **URL**: https://github.com/HL7/ig-template-base/blob/master/content/assets/css/prism.css
- **Key Elements to Extract**:
  - Base Prism theme
  - Token class structure
  - Line numbering styles
  - Selection and focus states
  - Dark/light theme support
    </context>
    <instruction>

### Step 1: Color Extraction

1. Download and analyze all four reference CSS files
2. Extract the following color values:
   - Primary brand colors (HL7 blue, orange)
   - FHIR resource type colors
   - Code and pre-formatted text backgrounds
   - Border and separator colors
   - Text colors (primary, secondary, muted)
   - Link and interactive element colors

### Step 2: Font and Typography

1. Identify font families used:
   - Primary text font
   - Monospace/code font
   - Heading fonts
2. Extract font sizes and line heights
3. Note font weights used for emphasis

### Step 3: Spacing and Layout

1. Extract standard padding/margin values
2. Identify border radius conventions
3. Note standard spacing units (likely based on Bootstrap grid)

### Step 4: Create Color Mapping

Map FML elements to appropriate FHIR IG colors
</instruction>
<output>
Map FML language constructs to FHIR IG visual concepts in markdown format
</output>
