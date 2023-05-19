import { Router } from 'express'
import getLanguages from '../routes/languages/getLanguages.js'

// Create a new router.
const languagesRotuer = Router()

// Add a GET route to the router.
languagesRotuer.get('/', getLanguages)

export default languagesRotuer
