import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

import { db } from '../database/db.js'
import { DevicesTable } from '../database/schema.js'
import { DeviceSchema } from '../types.js'

const JWT_SECRET = process.env.JWT_SECRET

export default {
  async create(c: any) {
    const req = await c.req
    const data = await req.json()
    const result = DeviceSchema.safeParse(data)
    const token = req.header('Authorization').split(' ')[1]
    const userId = req.header('UserId')

    try {
      const payload = jwt.verify(token, JWT_SECRET)

      if (!result.success) {
        console.log('Validation error: ', result.error.errors)
        return c.json({ type: 'form', message: 'Invalid form values' }, 422)
      }
      const name = result.data?.name

      const [newDevice] = await db
        .insert(DevicesTable)
        .values({ name: name, userId: Number(userId) })
        .returning()

      return c.json(newDevice, 201)
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        return c.json(
          {
            type: 'auth/expired',
            message: 'Token expired'
          },
          401
        )
      }

      return c.json(
        {
          type: 'auth',
          message: 'Unauthorized'
        },
        401
      )
    }
  },

  async getList(c: any) {
    const req = await c.req
    const userId = req.header('UserId')
    const token = req.header('Authorization').split(' ')[1]

    try {
      console.log(token)
      const payload = jwt.verify(token, JWT_SECRET)

      const devices = await db
        .select({ id: DevicesTable.id, name: DevicesTable.name })
        .from(DevicesTable)
        .where(eq(DevicesTable.userId, Number(userId)))

      console.log(devices)

      return c.json({ devices: devices }, 200)
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        return c.json(
          {
            type: 'auth/expired',
            message: 'Token expired'
          },
          401
        )
      }
      return c.json(
        {
          type: 'auth',
          message: 'Unauthorized'
        },
        401
      )
    }
  },

  async update(c: any) {
    const req = await c.req
    const data = await req.json()
    console.log(data)
    const result = DeviceSchema.safeParse(data)
    const deviceId = req.param('id')
    const token = req.header('Authorization').split(' ')[1]
    const userId = req.header('UserId')

    try {
      const payload = jwt.verify(token, JWT_SECRET)
      if (!result.success) {
        console.log('Validation error: ', result.error.errors)
        return c.json({ type: 'form', message: 'Invalid form values' }, 422)
      }
      const name = result.data?.name
      try {
        const [device] = await db
          .select({ id: DevicesTable.id, userId: DevicesTable.userId })
          .from(DevicesTable)
          .where(eq(DevicesTable.id, deviceId))
        console.log(device)
        if (!device) {
          return c.json(
            {
              type: 'device',
              message: 'Device not found'
            },
            404
          )
        }
        if (device.userId !== Number(userId)) {
          return c.json(
            {
              type: 'auth',
              message: 'Unauthorized'
            },
            401
          )
        }
      } catch (e) {
        console.log(e)
        return c.json(
          { type: 'api', message: 'An error occurred while checking the user' },
          500
        )
      }
      const [updatedDevice] = await db
        .update(DevicesTable)
        .set({ name: name })
        .where(eq(DevicesTable.id, deviceId))
        .returning()
      return c.json(updatedDevice, 200)
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        return c.json(
          {
            type: 'auth/expired',
            message: 'Token expired'
          },
          401
        )
      }
      return c.json(
        {
          type: 'auth',
          message: 'Unauthorized'
        },
        401
      )
    }
  },

  async delete(c: any) {
    const req = await c.req
    const id = req.param('id')

    const token = req.header('Authorization').split(' ')[1]
    const userId = req.header('UserId')

    try {
      const payload = jwt.verify(token, JWT_SECRET)
      try {
        const [device] = await db
          .select({ id: DevicesTable.id, userId: DevicesTable.userId })
          .from(DevicesTable)
          .where(eq(DevicesTable.id, id))
        if (!device) {
          return c.json(
            {
              type: 'device',
              message: 'Device not found'
            },
            404
          )
        }
        if (device.userId !== Number(userId)) {
          return c.json(
            {
              type: 'auth',
              message: 'Unauthorized'
            },
            401
          )
        }
      } catch (e) {
        console.log(e)
        return c.json(
          { type: 'api', message: 'An error occurred while checking the user' },
          500
        )
      }
      await db.delete(DevicesTable).where(eq(DevicesTable.id, id))

      return c.text('Device deleted successfully', 200)
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        return c.json(
          {
            type: 'auth/expired',
            message: 'Token expired'
          },
          401
        )
      }

      return c.json(
        {
          type: 'auth',
          message: 'Unauthorized'
        },
        401
      )
    }

    return c.json({ id: 1 }, 200)
  }
}
