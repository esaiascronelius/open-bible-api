import type { Request, Response } from 'express'
import bibleLanguages from '../../services/bible.js'

/**
 * GET /:language/translations/:translation/books/:book/chapters/:chapter/verse/:start-:end
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
const getVerseRange = (req: Request, res: Response): void => {
  const languageParam = req.params.language
  const translationParam = req.params.translation
  const bookParam = req.params.book
  const chapterParam = req.params.chapter
  const startParam = req.params.start
  const endParam = req.params.end

  const language = bibleLanguages.get(languageParam)
  if (!language) {
    res.status(404).json({ error: `Language ${languageParam} not found.` })
    return
  }

  const translation = language.translations.get(translationParam)
  if (!translation) {
    res.status(404).json({ error: `Translation ${translationParam} not found.` })
    return
  }

  const book = translation.books.get(bookParam)
  if (!book) {
    res.status(404).json({ error: `Book ${bookParam} not found.` })
    return
  }

  const chapter = book.chapters.get(Number(chapterParam))
  if (!chapter) {
    res.status(404).json({ error: `Chapter ${chapterParam} not found.` })
    return
  }

  const start = Number(startParam)
  const end = Number(endParam)
  const verses = Array.from(chapter.verses.values())
  const range = verses.slice(start - 1, end)
  res.json(
    range.map((verse, i) => ({
      number: start + i,
      text: verse
    }))
  )
}

export default getVerseRange
