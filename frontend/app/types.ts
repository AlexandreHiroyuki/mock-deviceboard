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
