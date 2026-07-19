import { Link } from 'react-router'
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
  { id: 'formats', label: 'Supported formats' },
  { id: 'cli', label: 'CLI reference' },
  { id: 'library', label: 'Go library' },
  { id: 'detection', label: 'Detection & streams' },
  { id: 'limits', label: 'Limits & safety' },
  { id: 'custom-converters', label: 'Custom converters' },
  { id: 'errors', label: 'Errors' },
  { id: 'limitations', label: 'Limitations' },
]

const formats = [
  ['PDF', 'convert/pdf', 'Text and layout reconstruction; scanned PDFs require OCR elsewhere.'],
  ['DOC', 'convert/doc', 'Word 97–2003 main-document text and displayed field results.'],
  [
    'DOCX',
    'convert/docx',
    'Headings, emphasis, lists, tables, links, images, and tracked changes.',
  ],
  ['XLSX', 'convert/xlsx', 'Every worksheet rendered as a heading and Markdown table.'],
  [
    'PPTX',
    'convert/pptx',
    'Ordered slides, tables, chart data, image alt text, and speaker notes.',
  ],
  ['HTML', 'convert/html', 'Sanitized DOM conversion with GitHub-flavored Markdown tables.'],
  ['CSV', 'convert/csv', 'Charset-aware conversion with comma, semicolon, tab, and pipe sniffing.'],
  ['ZIP', 'convert/zipfile', 'Supported members converted under per-file headings.'],
  ['Plain text', 'core', 'Charset-detected passthrough built into the default core engine.'],
]

const cliFlags = [
  ['-o file', 'Write Markdown to a file instead of stdout.'],
  ['-x .ext', 'Provide an extension hint; the leading dot is optional.'],
  ['-m type', 'Provide a MIME type hint, such as application/pdf.'],
  ['-c charset', 'Provide an input charset hint, such as shift_jis.'],
  ['-keep-data-uris', 'Keep full data URIs in HTML and DOCX output.'],
  ['-version', 'Print the installed version.'],
]

export default function DownmarkDocs() {
  return (
    <DocsPage
      name='downmark'
      description='Turn documents into clean, LLM-friendly Markdown with a single Go binary or a format-selective library.'
      githubUrl='https://github.com/giraffesyo/downmark'
      pkgGoDevUrl='https://pkg.go.dev/github.com/giraffesyo/downmark'
      highlights={['Pure Go', 'CLI + library', 'No external tools']}
      sections={sections}
    >
      <DocSection id='quick-start' title='Quick start'>
        <p>
          Downmark converts common document formats without Python, cgo, or subprocesses. Install
          the command, point it at a document, and receive normalized Markdown on stdout.
        </p>

        <CodeBlock label='Terminal'>{`go install github.com/giraffesyo/downmark/cmd/downmark@latest
downmark report.pdf > report.md`}</CodeBlock>

        <p>
          Use <code>-o</code> when you want Downmark to create the output file itself.
        </p>

        <CodeBlock label='Terminal'>{`downmark -o slides.md slides.pptx
cat legacy-report.doc | downmark -x doc > legacy-report.md
curl -sS https://example.com/report | downmark -m application/pdf > report.md`}</CodeBlock>

        <Callout title='No OCR'>
          Image-only PDFs and text converted to vector outlines have no extractable text. Downmark
          reports that condition instead of silently returning an empty document.
        </Callout>
      </DocSection>

      <DocSection id='formats' title='Supported formats'>
        <p>
          The CLI includes every converter. Library consumers can import only the format packages
          they need, keeping unused conversion stacks out of the final binary.
        </p>

        <DocsTable headers={['Format', 'Package', 'Output behavior']}>
          {formats.map(([format, pkg, behavior]) => (
            <tr key={format}>
              <TableCell>{format}</TableCell>
              <TableCell code>{pkg}</TableCell>
              <TableCell>{behavior}</TableCell>
            </tr>
          ))}
        </DocsTable>

        <p>
          PDF extraction is powered by the standalone{' '}
          <Link to='/pdf'>github.com/giraffesyo/pdf</Link> package, which is also available directly
          when you need positioned glyphs or plain text without Markdown conversion.
        </p>
      </DocSection>

      <DocSection id='cli' title='CLI reference'>
        <CodeBlock>{`usage: downmark [flags] [file]

Reads file, or stdin if omitted or "-", and writes Markdown to stdout.`}</CodeBlock>

        <DocsTable headers={['Flag', 'Purpose']}>
          {cliFlags.map(([flag, purpose]) => (
            <tr key={flag}>
              <TableCell code>{flag}</TableCell>
              <TableCell>{purpose}</TableCell>
            </tr>
          ))}
        </DocsTable>

        <DocSubsection title='Exit codes'>
          <DocsTable headers={['Code', 'Meaning']}>
            <tr>
              <TableCell code>0</TableCell>
              <TableCell>Conversion completed successfully.</TableCell>
            </tr>
            <tr>
              <TableCell code>1</TableCell>
              <TableCell>Conversion or output writing failed.</TableCell>
            </tr>
            <tr>
              <TableCell code>2</TableCell>
              <TableCell>Arguments were invalid or the input file could not be opened.</TableCell>
            </tr>
          </DocsTable>
        </DocSubsection>
      </DocSection>

      <DocSection id='library' title='Go library'>
        <DocSubsection title='All formats'>
          <p>
            The <code>all</code> package matches the CLI: it wires every converter into one engine
            and exposes convenience functions backed by a shared default engine.
          </p>

          <CodeBlock label='main.go'>{`package main

import (
    "context"
    "fmt"
    "log"

    "github.com/giraffesyo/downmark/all"
)

func main() {
    result, err := all.ConvertFile(context.Background(), "report.docx")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Print(result.Markdown)
}`}</CodeBlock>

          <p>
            Create an explicit all-format engine when you need options or want to reuse the engine
            with your own registrations.
          </p>

          <CodeBlock>{`engine := all.New(all.Options{
    KeepDataURIs: true,
})

result, err := engine.ConvertFile(ctx, "report.docx")`}</CodeBlock>
        </DocSubsection>

        <DocSubsection title='Select only the formats you use'>
          <p>
            The core package includes detection, the converter registry, and plain-text passthrough.
            Registering individual format packages means the Go linker never pulls in the others.
          </p>

          <CodeBlock label='main.go'>{`package main

import (
    "context"

    "github.com/giraffesyo/downmark"
    "github.com/giraffesyo/downmark/convert/docx"
    "github.com/giraffesyo/downmark/convert/pdf"
)

func convert(ctx context.Context, path string) (string, error) {
    engine := downmark.New()
    pdf.Register(engine)
    docx.Register(engine, docx.Options{})

    result, err := engine.ConvertFile(ctx, path)
    if err != nil {
        return "", err
    }
    return result.Markdown, nil
}`}</CodeBlock>

          <p>
            Use <code>downmark.WithoutBuiltins()</code> when you also want to remove the core
            plain-text fallback and start with an empty registry.
          </p>
        </DocSubsection>

        <DocSubsection title='Results'>
          <p>
            Successful conversions return a <code>*downmark.Result</code>. <code>Markdown</code>{' '}
            contains normalized output; <code>Title</code> contains a document title when the source
            format provides one.
          </p>

          <CodeBlock>{`type Result struct {
    Markdown string
    Title    string
}`}</CodeBlock>
        </DocSubsection>
      </DocSection>

      <DocSection id='detection' title='Detection and streams'>
        <p>
          <code>Engine.Convert</code> accepts any <code>io.Reader</code>. Provide whatever hints are
          trustworthy; Downmark combines them with content sniffing and tries the most specific
          matching converters first.
        </p>

        <CodeBlock>{`result, err := engine.Convert(ctx, response.Body, downmark.StreamInfo{
    MIMEType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    Filename: "report.docx",
    URL:      "https://example.com/report.docx",
})`}</CodeBlock>

        <DocsTable headers={['StreamInfo field', 'Meaning']}>
          <tr>
            <TableCell code>MIMEType</TableCell>
            <TableCell>Media type without parameters, such as application/pdf.</TableCell>
          </tr>
          <tr>
            <TableCell code>Extension</TableCell>
            <TableCell>Lowercase extension with a leading dot, such as .docx.</TableCell>
          </tr>
          <tr>
            <TableCell code>Charset</TableCell>
            <TableCell>IANA charset name, such as utf-8 or shift_jis.</TableCell>
          </tr>
          <tr>
            <TableCell code>Filename</TableCell>
            <TableCell>Base filename, when known.</TableCell>
          </tr>
          <tr>
            <TableCell code>LocalPath</TableCell>
            <TableCell>Source path for local inputs.</TableCell>
          </tr>
          <tr>
            <TableCell code>URL</TableCell>
            <TableCell>Original URL for network inputs.</TableCell>
          </tr>
        </DocsTable>

        <Callout title='Non-seekable readers'>
          Streams such as HTTP bodies and stdin are buffered in memory because converters may need
          to seek and retry. Matching Office and ZIP inputs are rejected at their compressed-input
          limit while buffering.
        </Callout>

        <DocSubsection title='Route only recognized documents'>
          <p>
            <code>CanConvert</code> checks whether a dedicated converter claims the hints. It does
            not read or sniff the input and deliberately excludes the plain-text fallback.
          </p>

          <CodeBlock>{`if engine.CanConvert(downmark.StreamInfo{Filename: upload.Name}) {
    result, err := engine.Convert(ctx, upload, downmark.StreamInfo{
        Filename: upload.Name,
    })
    // ...
}`}</CodeBlock>
        </DocSubsection>
      </DocSection>

      <DocSection id='limits' title='Limits and safety'>
        <p>
          Downmark treats document input as untrusted. Archive structure, decompressed data,
          generated output, parser work, and PDF extraction all have bounded paths.
        </p>

        <DocsTable headers={['Input', 'Built-in budgets']}>
          <tr>
            <TableCell>DOCX / XLSX / PPTX</TableCell>
            <TableCell>
              64 MiB compressed archive, 128 MiB total uncompressed, 16 MiB per part, and 1,024
              entries.
            </TableCell>
          </tr>
          <tr>
            <TableCell>ZIP</TableCell>
            <TableCell>
              64 MiB archive, 128 MiB total member data, 10 MiB per member, 64 converted members,
              1,024 scanned entries, and 32 MiB output.
            </TableCell>
          </tr>
          <tr>
            <TableCell>PDF</TableCell>
            <TableCell>
              Hard budgets for decoded streams, operations, glyphs, page-tree traversal, and nested
              Form XObjects.
            </TableCell>
          </tr>
        </DocsTable>

        <DocSubsection title='Set an application output budget'>
          <p>
            Derive the conversion context with <code>WithResultLimit</code>. A child context can
            tighten an existing limit but cannot loosen it.
          </p>

          <CodeBlock>{`ctx := downmark.WithResultLimit(request.Context(), 4<<20) // 4 MiB
result, err := engine.Convert(ctx, input, hints)`}</CodeBlock>

          <p>
            Converters consult the same budget while constructing large output, and the engine
            checks it again after Markdown normalization.
          </p>
        </DocSubsection>
      </DocSection>

      <DocSection id='custom-converters' title='Custom converters'>
        <p>
          Implement <code>downmark.Converter</code> and register it at the appropriate priority.
          <code>Accepts</code> must use only <code>StreamInfo</code>; content sniffing happens
          before the method is called.
        </p>

        <CodeBlock label='converter.go'>{`type rstConverter struct{}

func (rstConverter) Name() string { return "rst" }

func (rstConverter) Accepts(info downmark.StreamInfo) bool {
    return info.Matches(
        []string{".rst"},
        []string{"text/x-rst"},
    )
}

func (rstConverter) Convert(
    ctx context.Context,
    input io.ReadSeeker,
    info downmark.StreamInfo,
) (*downmark.Result, error) {
    // Parse input, honor ctx, and consult downmark.ResultLimit(ctx)
    // before constructing a large result.
    return &downmark.Result{Markdown: "# Converted\n"}, nil
}

engine.Register(rstConverter{}, downmark.PrioritySpecific)`}</CodeBlock>

        <p>
          Lower priority values run first. Use <code>PrioritySpecific</code> for a concrete format,
          <code>PriorityArchive</code> for archive walkers, and <code>PriorityGeneric</code> for
          catch-all formats. Within the same priority, the most recently registered converter runs
          first, allowing application converters to shadow defaults.
        </p>
      </DocSection>

      <DocSection id='errors' title='Errors'>
        <p>
          Use <code>errors.Is</code> for stable error categories and <code>errors.As</code> to
          inspect all converter attempts.
        </p>

        <CodeBlock>{`result, err := engine.Convert(ctx, input, hints)
if err != nil {
    switch {
    case errors.Is(err, downmark.ErrUnsupportedFormat):
        // No registered converter accepted the input.
    case errors.Is(err, downmark.ErrInputTooLarge):
        // A converter's hard input budget was exceeded.
    case errors.Is(err, downmark.ErrResultTooLarge):
        // The context result limit was exceeded.
    default:
        var conversionErr *downmark.ConversionError
        if errors.As(err, &conversionErr) {
            for _, attempt := range conversionErr.Attempts {
                log.Printf("%s: %v", attempt.Converter, attempt.Err)
            }
        }
    }
}`}</CodeBlock>

        <p>
          Context cancellation and deadline errors propagate normally. A{' '}
          <code>ConversionError</code> means one or more converters accepted the input but every
          attempted conversion failed.
        </p>
      </DocSection>

      <DocSection id='limitations' title='Limitations'>
        <ul>
          <li>There is no OCR for scanned or outlined-text PDFs.</li>
          <li>Complex multi-column PDF layouts may interleave.</li>
          <li>
            Legacy DOC conversion extracts main-document text but not formatting, tables, images,
            headers, footnotes, comments, or text boxes.
          </li>
          <li>
            DOCX headers, footers, footnotes, comments, and text boxes are skipped; equations become
            plain text and nested tables flatten.
          </li>
          <li>Encrypted Office files, PDFs, and ZIP archives are not decrypted.</li>
          <li>ZIP conversion does not recurse into nested ZIP archives.</li>
        </ul>

        <p>
          For implementation details, golden-output fixtures, and current benchmark data, see the{' '}
          <a
            href='https://github.com/giraffesyo/downmark'
            target='_blank'
            rel='noopener noreferrer'
          >
            source repository
          </a>
          .
        </p>

        <CodeBlock label='Development'>{`go test ./...
go test -run TestGolden -update .
golangci-lint run ./...`}</CodeBlock>
      </DocSection>
    </DocsPage>
  )
}
