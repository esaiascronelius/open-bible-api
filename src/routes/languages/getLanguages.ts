import type { Request, Response } from 'express'
import bibleLanguages from '../../services/bible.js'

/**
 * GET /api/languages
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 */
const getLanguages = (_: Request, res: Response): void => {
  const languages = Array.from(bibleLanguages.values())

  res.json(
    languages.map((language) => ({
      displayName: language.displayName,
      abbreviation: language.abbreviation
    }))
  )
}

export default getLanguages
