import { Hono } from 'hono'

import deviceController from './controllers/device.controller.js'
import userController from './controllers/user.controller.js'

const routes = new Hono()

routes.post('/signup', userController.create)
routes.post('/signin', userController.access)

routes.post('/device', deviceController.create)
routes.get('/device', deviceController.getList)
routes.put('/device/:id', deviceController.update)
routes.delete('/device/:id', deviceController.delete)

export { routes }
