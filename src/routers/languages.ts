import { Router } from 'express'
import getBooks from '../routes/languages/getBooks.js'
import getChapters from '../routes/languages/getChapters.js'
import getLanguages from '../routes/languages/getLanguages.js'
import getSingleVerse from '../routes/languages/getSingleVerse.js'
import getTranslations from '../routes/languages/getTranslations.js'
import getVerseRange from '../routes/languages/getVerseRange.js'
import getVerses from '../routes/languages/getVerses.js'

// Create a new router.
const languagesRotuer = Router()

// Get all languages.
languagesRotuer.get('/', getLanguages)

// Get all translations in a language.
languagesRotuer.get('/:language/translations', getTranslations)

// Get all books in a translation.
languagesRotuer.get('/:language/translations/:translation/books', getBooks)

// Get number of chapters in a book.
languagesRotuer.get('/:language/translations/:translation/books/:book/chapters', getChapters)

// Get number of verses in a chapter.
languagesRotuer.get('/:language/translations/:translation/books/:book/chapters/:chapter/verses', getVerses)

// Get a range of verses in a chapter.
languagesRotuer.get('/:language/translations/:translation/books/:book/chapters/:chapter/verses/:start-:end', getVerseRange)

// Get a single verse in a chapter.
languagesRotuer.get('/:language/translations/:translation/books/:book/chapters/:chapter/verses/:verse', getSingleVerse)

export default languagesRotuer
