import assert from 'node:assert/strict'
import test from 'node:test'
import { parseFrontMatter } from './front-matter.mjs'

test('parses multiline values and block arrays', () => {
  const frontMatter = parseFrontMatter(
    `---
title: YAML front matter
description: Full YAML syntax is supported
date: 2026-07-19
slug: yaml-front-matter
summary: >-
  A multiline summary with
  folded whitespace.
tags:
  - go
  - documents, parsing
published: true
---
`,
    'post.mdx',
  )

  assert.equal(frontMatter.summary, 'A multiline summary with folded whitespace.')
  assert.deepEqual(frontMatter.tags, ['go', 'documents, parsing'])
  assert.equal(frontMatter.published, true)
})

test('rejects invalid metadata types', () => {
  assert.throws(
    () =>
      parseFrontMatter(
        `---
title: Invalid tags
description: Tags must be an array
date: 2026-07-19
slug: invalid-tags
tags: go
---
`,
        'post.mdx',
      ),
    /tags in post\.mdx must be an array of strings/,
  )
})
