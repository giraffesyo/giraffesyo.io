import { parse as parseYaml } from 'yaml'

export function parseFrontMatter(source, filename) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) throw new Error(`Missing front matter in ${filename}`)

  let frontMatter
  try {
    frontMatter = parseYaml(match[1])
  } catch (error) {
    throw new Error(`Invalid YAML front matter in ${filename}`, { cause: error })
  }

  if (!frontMatter || typeof frontMatter !== 'object' || Array.isArray(frontMatter)) {
    throw new Error(`Front matter in ${filename} must be a YAML mapping`)
  }

  for (const required of ['title', 'description', 'date', 'slug']) {
    if (typeof frontMatter[required] !== 'string' || !frontMatter[required].trim()) {
      throw new Error(`Front matter ${required} in ${filename} must be a non-empty string`)
    }
  }

  for (const optional of ['summary', 'image', 'readingTime']) {
    if (frontMatter[optional] !== undefined && typeof frontMatter[optional] !== 'string') {
      throw new Error(`Front matter ${optional} in ${filename} must be a string`)
    }
  }

  if (
    frontMatter.tags !== undefined &&
    (!Array.isArray(frontMatter.tags) || frontMatter.tags.some((tag) => typeof tag !== 'string'))
  ) {
    throw new Error(`Front matter tags in ${filename} must be an array of strings`)
  }

  if (frontMatter.published !== undefined && typeof frontMatter.published !== 'boolean') {
    throw new Error(`Front matter published in ${filename} must be a boolean`)
  }

  return frontMatter
}
