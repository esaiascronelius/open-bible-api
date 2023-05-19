import type { Request, Response } from 'express'
import bibleLanguages from '../../services/bible.js'

/**
 * GET /api/languages/:language/translations
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {string} req.params.language The language to get translations for.
 */
const getTranslations = (req: Request, res: Response): void => {
  const languageParam = req.params.language

  const language = bibleLanguages.get(languageParam)
  if (!language) {
    res.status(404).json({ error: `Language ${languageParam} not found.` })
    return
  }

  const translations = Array.from(language.translations.values())
  res.json(translations.map((translation) => ({ name: translation.name, abbreviation: translation.abbreviation, uid: translation.uid, info: translation.info })))
}

export default getTranslations
