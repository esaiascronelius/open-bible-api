import type { Request, Response } from 'express'
import bibleLanguages from '../../services/bible.js'

/**
 * GET /api/languages/:language/translations/:translation/books
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
const getBooks = (req: Request, res: Response): void => {
  const languageParam = req.params.language
  const translationParam = req.params.translation

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

  const books = Array.from(translation.books.values())
  res.json(books.map((book) => ({ name: book.name, abbreviation: book.abbreviation })))
}

export default getBooks
