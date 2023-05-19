import type { Request, Response } from 'express'
import bibleLanguages from '../../services/bible.js'

/**
 * GET /:language/translations/:translation/books/:book/chapters
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
const getChapters = (req: Request, res: Response): void => {
  const languageParam = req.params.language
  const translationParam = req.params.translation
  const bookParam = req.params.book

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

  const chapters = Array.from(book.chapters.values())
  res.json({ count: chapters.length })
}

export default getChapters
