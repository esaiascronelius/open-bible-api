import { loadTranslations } from './services/bible.js'
import { createApp, startApp } from './services/http.js'

await loadTranslations()
startApp(createApp())
