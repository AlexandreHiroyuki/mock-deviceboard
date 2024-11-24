import { Hono } from 'hono'

import userController from './controllers/user.controller.js'

const routes = new Hono()

routes.get('/', (c) => {
  return c.text('Hello Hono!')
})

routes.post('/signup', userController.create)
routes.post('/signin', userController.access)

export { routes }
