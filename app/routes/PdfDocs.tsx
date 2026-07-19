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
  { id: 'extraction', label: 'Extracting text' },
  { id: 'glyphs', label: 'Glyph positions' },
  { id: 'behavior', label: 'Parser behavior' },
  { id: 'coverage', label: 'Format coverage' },
  { id: 'pdftest', label: 'pdftest helpers' },
  { id: 'safety', label: 'Safety model' },
  { id: 'limitations', label: 'Limitations' },
]

const coverage = [
  ['Classic xref tables', 'Supported', 'Traditional PDF cross-reference layout.'],
  ['Xref streams', 'Supported', 'PDF 1.5 compressed cross-reference data.'],
  ['Object streams', 'Supported', 'Compressed indirect objects.'],
  ['Hybrid references', 'Supported', 'Files combining xref tables and xref streams.'],
  ['Form XObjects', 'Supported', 'Recursive text extraction, including Google Docs exports.'],
  ['ToUnicode CMaps', 'Supported', 'Identity-H and other composite-font decoding.'],
  [
    'Standard encryption',
    'Partial',
    'RC4, AES-128, and AES-256 when an empty password unlocks the file.',
  ],
  ['Image-only pages', 'No OCR', 'Returns no glyphs because images contain no PDF text operators.'],
]

export default function PdfDocs() {
  return (
    <DocsPage
      name='pdf'
      description='Extract readable text and positioned glyphs from real-world PDF files with a hardened, zero-dependency Go package.'
      githubUrl='https://github.com/giraffesyo/pdf'
      pkgGoDevUrl='https://pkg.go.dev/github.com/giraffesyo/pdf'
      highlights={['Pure Go', 'Zero dependencies', 'Positioned glyphs']}
      sections={sections}
    >
      <DocSection id='quick-start' title='Quick start'>
        <p>Add the module to your Go project, open a PDF, and pass its size to the extractor.</p>

        <CodeBlock label='Terminal'>go get github.com/giraffesyo/pdf</CodeBlock>

        <CodeBlock label='main.go'>{`package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/giraffesyo/pdf"
)

func main() {
    file, err := os.Open("report.pdf")
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    info, err := file.Stat()
    if err != nil {
        log.Fatal(err)
    }

    document, err := pdf.Extract(context.Background(), file, info.Size())
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(document.Text())
}`}</CodeBlock>

        <Callout title='Input contract'>
          <code>Extract</code> accepts an <code>io.ReaderAt</code> and an exact byte size. Files and{' '}
          <code>bytes.Reader</code> values satisfy the interface without copying the entire PDF into
          another buffer.
        </Callout>
      </DocSection>

      <DocSection id='extraction' title='Extracting text'>
        <p>
          Extraction returns a document containing pages, and each page contains decoded glyphs.
          Text reconstruction is available at both document and page level.
        </p>

        <CodeBlock>{`document, err := pdf.Extract(ctx, readerAt, size)
if err != nil {
    return err
}

wholeDocument := document.Text()
firstPage := document.Pages[0].Text()`}</CodeBlock>

        <DocsTable headers={['API', 'Behavior']}>
          <tr>
            <TableCell code>pdf.Extract</TableCell>
            <TableCell>
              Parses the file and returns positioned glyphs for every discovered page.
            </TableCell>
          </tr>
          <tr>
            <TableCell code>Document.Text</TableCell>
            <TableCell>
              Reconstructs all non-empty pages as plain text, separated by one blank line.
            </TableCell>
          </tr>
          <tr>
            <TableCell code>Page.Text</TableCell>
            <TableCell>
              Clusters glyphs by baseline, sorts each line by horizontal position, and recovers word
              spaces from glyph gaps and font metrics.
            </TableCell>
          </tr>
        </DocsTable>

        <DocSubsection title='Extract from memory'>
          <CodeBlock>{`data, err := os.ReadFile("report.pdf")
if err != nil {
    return err
}

reader := bytes.NewReader(data)
document, err := pdf.Extract(ctx, reader, int64(len(data)))`}</CodeBlock>
        </DocSubsection>

        <p>
          If your final output needs Markdown rather than plain text, use{' '}
          <Link to='/downmark'>Downmark</Link>, which wraps this package with document detection,
          conversion, CLI support, and other formats.
        </p>
      </DocSection>

      <DocSection id='glyphs' title='Glyph positions'>
        <p>
          Read <code>Page.Glyphs</code> directly when you need coordinates, font-relative sizing,
          custom layout analysis, highlighting, or search-result boxes.
        </p>

        <CodeBlock>{`for pageIndex, page := range document.Pages {
    for _, glyph := range page.Glyphs {
        fmt.Printf(
            "page=%d text=%q x=%.2f y=%.2f advance=%.2f size=%.2f\n",
            pageIndex+1,
            glyph.Text,
            glyph.X,
            glyph.Y,
            glyph.Advance,
            glyph.Size,
        )
    }
}`}</CodeBlock>

        <DocsTable headers={['Field', 'Meaning']}>
          <tr>
            <TableCell code>Text</TableCell>
            <TableCell>Decoded, non-empty text for one glyph or glyph cluster.</TableCell>
          </tr>
          <tr>
            <TableCell code>X, Y</TableCell>
            <TableCell>Glyph origin in unrotated page space.</TableCell>
          </tr>
          <tr>
            <TableCell code>Advance</TableCell>
            <TableCell>Horizontal advance used to estimate the end of the glyph.</TableCell>
          </tr>
          <tr>
            <TableCell code>Size</TableCell>
            <TableCell>Effective font size after the text and transformation matrices.</TableCell>
          </tr>
        </DocsTable>

        <Callout>
          Glyphs preserve positions, not semantic blocks. The package does not label paragraphs,
          columns, headers, tables, or reading regions; build those decisions from the coordinates
          when your application needs them.
        </Callout>
      </DocSection>

      <DocSection id='behavior' title='Parser behavior'>
        <p>
          PDF text is usually a sequence of drawing instructions, not stored paragraphs. The
          extractor interprets those instructions, tracks the current transformation and text
          matrices, decodes each font, and then reconstructs lines from final glyph positions.
        </p>

        <ul>
          <li>
            Nested Form XObjects inherit resources and transformations, so text embedded by tools
            such as Google Docs is included.
          </li>
          <li>
            ToUnicode CMaps, standard font encodings, the Adobe Glyph List, CID widths, and
            Identity-H composite fonts are used to decode character codes.
          </li>
          <li>
            Content split across multiple <code>/Contents</code> streams is interpreted as one
            logical stream, even when a token crosses a segment boundary.
          </li>
          <li>Inline images are skipped without confusing their binary bytes for operators.</li>
          <li>
            Undecodable glyphs are dropped rather than replaced with plausible-looking garbage.
          </li>
        </ul>

        <DocSubsection title='Partial results and cancellation'>
          <p>
            A malformed file returns an error. Within an otherwise readable file, a malformed page
            or content stream can retain glyphs decoded before that local failure. The context is
            checked between pages, so cancellation and deadlines stop multi-page extraction.
          </p>
        </DocSubsection>
      </DocSection>

      <DocSection id='coverage' title='Format coverage'>
        <DocsTable headers={['Feature', 'Status', 'Notes']}>
          {coverage.map(([feature, status, notes]) => (
            <tr key={feature}>
              <TableCell>{feature}</TableCell>
              <TableCell code>{status}</TableCell>
              <TableCell>{notes}</TableCell>
            </tr>
          ))}
        </DocsTable>

        <p>
          Stream decoding includes the filters needed by text and object data. Image-only filters
          such as DCT, JPX, CCITT, and JBIG2 are deliberately not decoded because text extraction
          does not require their pixels.
        </p>
      </DocSection>

      <DocSection id='pdftest' title='pdftest helpers'>
        <p>
          The <code>github.com/giraffesyo/pdf/pdftest</code> package builds small, deterministic PDF
          fixtures in memory. It is useful for testing your own PDF pipeline without checking binary
          fixtures into source control.
        </p>

        <CodeBlock label='extract_test.go'>{`func TestExtractsGreeting(t *testing.T) {
    content := pdftest.Stream(
        "",
        "BT /F1 12 Tf 72 720 Td (Hello, PDF!) Tj ET",
    )
    data := pdftest.Build(
        1,
        pdftest.Catalog(2),
        pdftest.Pages(3),
        pdftest.Page(2, 4, "<< /Font << /F1 5 0 R >> >>"),
        content,
        pdftest.Helvetica(),
    )

    document, err := pdf.Extract(
        context.Background(),
        bytes.NewReader(data),
        int64(len(data)),
    )
    if err != nil {
        t.Fatal(err)
    }
    if got, want := document.Text(), "Hello, PDF!"; got != want {
        t.Fatalf("Text() = %q, want %q", got, want)
    }
}`}</CodeBlock>

        <DocsTable headers={['Helper', 'Use']}>
          <tr>
            <TableCell code>Build</TableCell>
            <TableCell>Assemble numbered objects into a classic PDF with an xref table.</TableCell>
          </tr>
          <tr>
            <TableCell code>Stream / Flate</TableCell>
            <TableCell>Create plain or Flate-compressed stream objects.</TableCell>
          </tr>
          <tr>
            <TableCell code>BuildXrefStream</TableCell>
            <TableCell>Build a PDF 1.5 file using a cross-reference stream.</TableCell>
          </tr>
          <tr>
            <TableCell code>BuildObjStm</TableCell>
            <TableCell>Pack selected indirect objects into an object stream.</TableCell>
          </tr>
          <tr>
            <TableCell code>BuildHybrid</TableCell>
            <TableCell>Create a hybrid-reference fixture.</TableCell>
          </tr>
          <tr>
            <TableCell code>BuildEncrypted</TableCell>
            <TableCell>Create a standard-handler encrypted fixture from an EncryptSpec.</TableCell>
          </tr>
          <tr>
            <TableCell code>ToUnicodeCMap / Type0Font</TableCell>
            <TableCell>Build composite-font fixtures with explicit Unicode mappings.</TableCell>
          </tr>
        </DocsTable>
      </DocSection>

      <DocSection id='safety' title='Safety model'>
        <p>
          PDF input is untrusted by default. The parser uses hard budgets and structural validation
          to prevent malformed files from turning into unbounded CPU, memory, or recursion work.
        </p>

        <ul>
          <li>Decoded streams have byte limits, including chained filters.</li>
          <li>Content interpretation limits operations and emitted glyphs per page.</li>
          <li>Form XObject recursion is depth-bounded.</li>
          <li>Page trees are checked for excessive depth, size, and reference cycles.</li>
          <li>Object, xref, predictor, and CMap parsing use bounded reads and counts.</li>
        </ul>

        <Callout title='Application limits still matter'>
          The package bounds parser internals, but your service should still enforce upload size,
          request deadlines, concurrency, and retained-output limits appropriate to its workload.
        </Callout>
      </DocSection>

      <DocSection id='limitations' title='Limitations'>
        <ul>
          <li>No OCR for scanned pages or text converted to vector outlines.</li>
          <li>
            No semantic layout analysis beyond line and word reconstruction; complex multi-column
            pages may interleave.
          </li>
          <li>
            Password-protected files fail unless the empty user or owner password unlocks the
            standard security handler.
          </li>
          <li>Image filters are not decoded because the package does not inspect image pixels.</li>
        </ul>

        <p>
          The repository includes synthetic coverage tests, real-world regression fixtures, fuzz
          targets, and a separate benchmark module comparing support and extraction cost with other
          Go PDF packages.
        </p>

        <CodeBlock label='Development'>{`go test ./...

cd benchmarks
go test -run TestCompetitorComparison -v ./...
go test -bench . -benchmem -run '^$' -count=1 ./...`}</CodeBlock>
      </DocSection>
    </DocsPage>
  )
}
