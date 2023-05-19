import type { Request, Response } from 'express'
import bibleLanguages from '../../services/bible.js'

/**
 * GET /:language/translations/:translation/books/:book/chapters/:chapter/verses/:verse
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
const getSingleVerse = (req: Request, res: Response): void => {
  const languageParam = req.params.language
  const translationParam = req.params.translation
  const bookParam = req.params.book
  const chapterParam = req.params.chapter
  const verseParam = req.params.verse

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

  const verse = chapter.verses.get(Number(verseParam))
  if (!verse) {
    res.status(404).json({ error: `Verse ${verseParam} not found.` })
    return
  }

  res.json({
    number: Number(verseParam),
    text: verse
  })
}

export default getSingleVerse
