import { Input, Label, TextField } from 'react-aria-components'
import { FieldError } from 'react-hook-form'
import { css } from 'styled-system/css'

import { FormFieldProps } from '~/types'

const styleFormInputField = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',

  my: '4'
})

const styleFormInputLabel = css({
  fontSize: 'sm',
  fontWeight: 'bold'
})

const styleFormInput = (error: FieldError | undefined) =>
  css({
    fontSize: 'md',
    p: '1',
    mt: '1',
    borderRadius: 'md',
    border: '1px solid',
    borderColor: 'gray',

    _focus: {
      outlineColor: error ? 'red.500' : 'primary.500',
      bg: error ? 'red.50' : 'primary.50'
    }
  })

const styleInputError = css({
  fontSize: 'sm',
  color: 'red.500',
  mt: '1'
})

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  label,
  register,
  error,
  valueAsNumber
}) => (
  <TextField name={name} type={type} className={styleFormInputField}>
    <Label className={styleFormInputLabel}>{label}</Label>
    <Input
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className={styleFormInput(error)}
    />
    {error && <span className={styleInputError}>{error.message}</span>}
  </TextField>
)
export default FormField
