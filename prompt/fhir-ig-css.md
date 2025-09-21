<goal>
Adapt the `src/prism-lang-fml.css` stylesheet to seamlessly integrate with the FHIR Implementation Guide styling ecosystem, ensuring visual consistency with existing HL7 templates and maintaining accessibility standards.
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

Map FML elements to appropriate FHIR IG colors:

See `docs\FML-FHIR-IG-MAPPING.md`

### Step 5: Testing Scenarios

Create test cases for:

1. **Basic FML file** - All token types visible
2. **Within IG narrative** - Embedded in HTML context
3. **Example tabs** - Multiple code views
4. **Print preview** - Ensure printability
5. **Dark mode** - If IG supports it
6. **Mobile view** - Responsive behavior
7. **High contrast** - Accessibility testing

### Step 6: Validation Checklist

- [ ] Colors match FHIR IG palette
- [ ] Fonts align with IG typography
- [ ] Spacing consistent with IG layout
- [ ] No visual conflicts with Bootstrap styles
- [ ] Accessible (WCAG 2.1 AA compliant)
- [ ] Print-friendly
- [ ] Mobile responsive
- [ ] Dark mode compatible (if applicable)
- [ ] Performance optimized (minimal CSS)
- [ ] Cross-browser tested
      </instruction>
      <recommandation>

## Expected Deliverables

### Primary Output: prism-lang-fml.css

A complete CSS file that:

1. Integrates seamlessly with FHIR IG templates
2. Provides clear FML syntax highlighting
3. Maintains consistency with existing Prism languages
4. Supports all accessibility features
5. Includes comprehensive documentation

### Secondary Outputs:

1. **Color palette documentation** - Extracted colors and their usage
2. **Integration guide** - How to add to existing IGs
3. **Test HTML file** - Demonstrates all styling
4. **Screenshot comparisons** - Before/after styling

## Additional Considerations

### Browser Compatibility

Ensure compatibility with:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

### Performance

- Minimize CSS file size
- Use efficient selectors
- Avoid complex cascading
- Consider CSS custom properties for theming

### Maintenance

- Document all color choices
- Provide update instructions for IG template changes
- Include version compatibility notes

### Accessibility

- Ensure color contrast ratios meet WCAG 2.1 AA
- Support high contrast mode
- Include focus indicators
- Test with screen readers

</recommandation>
<output>
The adapted `src\prism-lang-fml.css` file will be considered complete when:
1. ✓ All FML tokens are properly styled
2. ✓ Visual consistency with FHIR IG templates achieved
3. ✓ No style conflicts with existing IG CSS
4. ✓ No style conflicts with existing PrismJs plugin
5. ✓ Accessibility standards met (WCAG 2.1 AA)
6. ✓ Cross-browser testing passed
7. ✓ Performance benchmarks met (<10KB minified)
8. ✓ Documentation complete and clear
9. ✓ Integration tested in actual IG

</output>
