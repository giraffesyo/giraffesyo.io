import DocsPage, {
  Callout,
  CodeBlock,
  DocSection,
  DocSubsection,
  type DocsSectionLink,
  DocsTable,
  TableCell,
} from '../components/docs/DocsPage'

const sections: DocsSectionLink[] = [
  { id: 'quick-start', label: 'Quick start' },
  { id: 'conversion', label: 'Name conversion' },
  { id: 'initialisms', label: 'Initialisms' },
  { id: 'collisions', label: 'Collision handling' },
  { id: 'code-generation', label: 'Code generation' },
  { id: 'api', label: 'API reference' },
  { id: 'performance', label: 'Performance' },
]

const conversions = [
  ['user_id', 'UserID', 'userID'],
  ['HTTPServerURL', 'HTTPServerURL', 'httpServerURL'],
  ['some.dotted-name', 'SomeDottedName', 'someDottedName'],
  ['123-response', 'N123Response', 'n123Response'],
  ['type', 'Type', 'type_'],
  ['用户_id', 'X用户ID', '用户ID'],
  ['---', 'Unknown', 'unknown'],
]

export default function OpenApiGoNamingDocs() {
  return (
    <DocsPage
      name='openapi-go-naming'
      description='Convert OpenAPI identifiers into idiomatic, deterministic, and collision-safe Go names.'
      githubUrl='https://github.com/giraffesyo/openapi-go-naming'
      pkgGoDevUrl='https://pkg.go.dev/github.com/giraffesyo/openapi-go-naming'
      highlights={['Go 1.25+', 'Zero dependencies', 'Concurrency-safe']}
      sections={sections}
    >
      <DocSection id='quick-start' title='Quick start'>
        <p>
          Add the module, import it with a short package alias, and choose an exported or unexported
          identifier based on where the generated name will be used.
        </p>

        <CodeBlock label='Terminal'>go get github.com/giraffesyo/openapi-go-naming</CodeBlock>

        <CodeBlock label='generator.go'>{`import naming "github.com/giraffesyo/openapi-go-naming"

typeName := naming.Exported("user_profile")   // UserProfile
fieldName := naming.Exported("account_id")    // AccountID
paramName := naming.Unexported("account_id")  // accountID`}</CodeBlock>

        <Callout>
          Every result is a valid Go identifier. Exported results satisfy Go's exported-name rules,
          while unexported results remain unexported and avoid language keywords.
        </Callout>
      </DocSection>

      <DocSection id='conversion' title='Name conversion'>
        <p>
          Conversion is deterministic across separator styles and existing case conventions. The
          tokenizer recognizes case transitions, preserves conventional Go initialisms, and treats
          non-letter and non-digit characters as boundaries.
        </p>

        <DocsTable headers={['Input', 'Exported', 'Unexported']}>
          {conversions.map(([input, exported, unexported]) => (
            <tr key={input}>
              <TableCell code>{input}</TableCell>
              <TableCell code>{exported}</TableCell>
              <TableCell code>{unexported}</TableCell>
            </tr>
          ))}
        </DocsTable>

        <DocSubsection title='Guaranteed identifiers'>
          <ul>
            <li>
              Empty or separator-only input becomes <code>Unknown</code> or <code>unknown</code>.
            </li>
            <li>
              Names beginning with a digit receive a stable <code>N</code> or <code>n</code> prefix.
            </li>
            <li>
              Unexported Go keywords receive a trailing underscore, such as <code>type_</code>.
            </li>
            <li>Unicode letters and digits are retained.</li>
            <li>
              Exported names whose first script has no uppercase form receive an <code>X</code>
              prefix so Go recognizes them as exported.
            </li>
          </ul>
        </DocSubsection>
      </DocSection>

      <DocSection id='initialisms' title='Initialisms'>
        <p>
          The default converter knows conventional Go initialisms, including <code>API</code>,{' '}
          <code>HTTP</code>, <code>ID</code>, <code>JSON</code>, <code>URL</code>, and{' '}
          <code>UUID</code>.
        </p>

        <CodeBlock>{`naming.Exported("json_api_url")   // JSONAPIURL
naming.Unexported("http_server") // httpServer`}</CodeBlock>

        <p>
          Add project-specific initialisms by creating an immutable converter. Matching is
          case-insensitive, and the configured canonical spelling is uppercase.
        </p>

        <CodeBlock>{`converter := naming.NewConverter("GPU", "HPC")

converter.Exported("gpu_limit")    // GPULimit
converter.Unexported("hpc_queue")  // hpcQueue`}</CodeBlock>

        <Callout title='Safe to share'>
          A <code>Converter</code> is immutable after construction and safe for concurrent use. A
          nil converter also falls back to the standard initialism set.
        </Callout>
      </DocSection>

      <DocSection id='collisions' title='Collision handling'>
        <p>
          A <code>Scope</code> allocates unique identifiers within one generated namespace. The
          first available name is unchanged; later collisions receive the lowest available decimal
          suffix beginning with 2.
        </p>

        <CodeBlock>{`scope := naming.NewScope("User2", "User4")

scope.Unique("User") // User
scope.Unique("User") // User3
scope.Unique("User") // User5`}</CodeBlock>

        <DocSubsection title='Reserve names later'>
          <CodeBlock>{`var scope naming.Scope // the zero value is ready to use

scope.Reserve("Error", "Client")
scope.Unique("Error") // Error2
scope.Unique("Model") // Model`}</CodeBlock>

          <p>
            Reservations and allocations are exact and case-sensitive. Repeating a reservation has
            no effect. A scope is safe for concurrent use, but it must not be copied after its first
            operation.
          </p>
        </DocSubsection>
      </DocSection>

      <DocSection id='code-generation' title='Code-generation pattern'>
        <p>
          Convert external names first, then allocate the result in the scope that represents the Go
          namespace you are generating. Use separate scopes for package declarations, struct fields,
          parameters, or any other independently resolved namespace.
        </p>

        <CodeBlock>{`typeNames := naming.NewScope("Client", "Error")

typeName := typeNames.Unique(naming.Exported(schemaName))

fieldNames := naming.NewScope()
for _, propertyName := range propertyNames {
    fieldName := fieldNames.Unique(naming.Exported(propertyName))
    emitField(fieldName)
}`}</CodeBlock>

        <Callout>
          Conversion is intentionally stateless. Collision behavior belongs to an explicit scope,
          which keeps generated output reproducible and makes namespace boundaries visible in the
          generator.
        </Callout>
      </DocSection>

      <DocSection id='api' title='API reference'>
        <DocsTable headers={['API', 'Purpose']}>
          <tr>
            <TableCell code>Exported(input)</TableCell>
            <TableCell>Convert input to an exported PascalCase Go identifier.</TableCell>
          </tr>
          <tr>
            <TableCell code>Unexported(input)</TableCell>
            <TableCell>Convert input to an unexported camelCase Go identifier.</TableCell>
          </tr>
          <tr>
            <TableCell code>NewConverter(initialisms...)</TableCell>
            <TableCell>Create an immutable converter with additional initialisms.</TableCell>
          </tr>
          <tr>
            <TableCell code>NewScope(reserved...)</TableCell>
            <TableCell>Create a collision scope with names already marked unavailable.</TableCell>
          </tr>
          <tr>
            <TableCell code>Scope.Reserve(names...)</TableCell>
            <TableCell>Mark more exact identifiers as unavailable.</TableCell>
          </tr>
          <tr>
            <TableCell code>Scope.Unique(identifier)</TableCell>
            <TableCell>
              Return the identifier or allocate its next available numeric suffix.
            </TableCell>
          </tr>
        </DocsTable>
      </DocSection>

      <DocSection id='performance' title='Performance and testing'>
        <p>
          Conversion uses a single-pass tokenizer and writes directly into one output buffer. Common
          ASCII conversions allocate only the returned string. The repository includes allocation
          assertions, concurrent scope tests, fuzz tests for identifier validity and determinism,
          and benchmarks for both conversion directions and scope allocation.
        </p>

        <CodeBlock label='Development'>{`go test ./...
go test -bench . -benchmem -run '^$' ./...
go test -fuzz FuzzExported -fuzztime 10s ./...`}</CodeBlock>

        <p>
          Generated identifiers are designed for code generation, not round trips: separators,
          original capitalization, and discarded symbols cannot be recovered from the result.
        </p>
      </DocSection>
    </DocsPage>
  )
}
