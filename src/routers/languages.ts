import { Router } from 'express'
import getLanguages from '../routes/languages/getLanguages.js'
import getTranslations from '../routes/languages/getTranslations.js'

// Create a new router.
const languagesRotuer = Router()

// Get all languages.
languagesRotuer.get('/', getLanguages)

// Get all translations in a language.
languagesRotuer.get('/:language/translations', getTranslations)

export default languagesRotuer
