import type { Express } from 'express'
import helmet from 'helmet'

/**
 * Setup helmet on express app.
 *
 * @param {Express} app The express app.
 */
const useHelmet = (app: Express): void => {
  app.use(helmet({}))
}

export default useHelmet
