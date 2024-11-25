import { FieldError, UseFormRegister } from 'react-hook-form'
import { z, ZodType } from 'zod'

export type FormData = {
  email: string
  password: string
}

export type FormFieldProps = {
  type: string
  placeholder: string
  name: ValidFieldNames
  label: string
  register: UseFormRegister<FormData>
  error: FieldError | undefined
  valueAsNumber?: boolean
}

export type ValidFieldNames = 'email' | 'password'

export const UserSchema: ZodType<FormData> = z.object({
  email: z.string().email({ message: 'Invalid email' }),

  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(20, { message: 'Password is too long' })
})

export type DeviceData = {
  name: string
}

export type ValidDeviceFieldNames = 'name'

export type DeviceFieldProps = {
  type: string
  placeholder: string
  name: ValidDeviceFieldNames
  label: string
  register: UseFormRegister<DeviceData>
  error: FieldError | undefined
  valueAsNumber?: boolean
}

export const DeviceSchema: ZodType<DeviceData> = z.object({
  name: z
    .string()
    .min(1, { message: 'Device name is too short' })
    .max(50, { message: 'Device name is too long' })
})
