import express, { Express } from 'express'
import useHelmet from '../libs/useHelmet.js'

/**
 * Create a new instance of the express app
 * with middleware and routers.
 *
 * @returns {Express} The express app.
 */
export const createApp = (): Express => {
  const app = express()
  addMiddleware(app)
  addRouters(app)
  return app
}

/**
 * Add middleware to the express app.
 *
 * @param {Express} app The express app.
 */
const addMiddleware = (app: Express): void => {
  app.use(express.json())
  useHelmet(app)
}

/**
 * Add routers to the express app.
 *
 * @param {Express} app The express app.
 */
const addRouters = (app: Express): void => {
  // 404 Error Page
  app.use((_, res) => res.status(404).send('404 Not Found'))
}

/**
 * Start the express app.
 *
 * @param {Express} app The express app.
 * @param {number} port The port to listen on. Defaults to 3000.
 */
export const startApp = (app: Express, port = 3000): void => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
