import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Dialog,
  FieldError,
  Form,
  Heading,
  Input,
  Label,
  TextField
} from 'react-aria-components'
import * as HookForm from 'react-hook-form'
import { RiEdit2Line } from 'react-icons/ri'
import { css } from 'styled-system/css'

import { DeviceData, DeviceFieldProps, DeviceSchema } from '~/types'

const styleFormInputField = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  fontWeight: 'normal',

  my: '4'
})

const styleFormInputLabel = css({
  textAlign: 'left',
  fontSize: 'sm',
  fontWeight: 'bold'
})

const styleFormInput = (error: HookForm.FieldError | undefined) =>
  css({
    fontSize: 'md',
    p: '1',
    mt: '1',
    borderRadius: 'md',
    border: '1px solid',
    borderColor: 'gray',

    _focus: {
      outlineColor: error ? 'red.500' : 'primary.500',
      bgColor: error ? 'red.50' : 'primary.50'
    }
  })

const styleInputError = css({
  fontSize: 'sm',
  color: 'red.500',
  mt: '1'
})

const FormField: React.FC<DeviceFieldProps> = ({
  type,
  placeholder,
  name,
  label,
  register,
  error,
  valueAsNumber
}) => (
  <TextField
    name={name}
    type={type}
    isInvalid={error !== undefined}
    className={styleFormInputField}
  >
    <Label className={styleFormInputLabel}>{label}</Label>
    <Input
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className={styleFormInput(error)}
    />

    {error && (
      <FieldError className={styleInputError}>{error.message}</FieldError>
    )}
  </TextField>
)

interface EditDeviceFormProps {
  deviceName: string
  deviceId: number
  onSubmit: (name: string, id: number) => Promise<void>
}
const AddDeviceForm = ({
  deviceName,
  deviceId,
  onSubmit
}: EditDeviceFormProps) => {
  const [isOpen, setOpen] = useState(false)
  const [isClosing, setClosing] = useState(false)
  const modalRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = HookForm.useForm<DeviceData>({
    resolver: zodResolver(DeviceSchema) // Apply the zodResolver
  })

  const closeModal = () => {
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 500)
  }

  const submit = async (data: DeviceData) => {
    try {
      onSubmit(data.name, deviceId)
      setOpen(false)
    } catch (error: any) {
      const errorBody = error.response.data

      setError(errorBody.type, { message: errorBody.message }) // Set the error

      console.error('Submitting form failed!', error)
    }
  }

  function useOutsideClickEvent(ref: React.RefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  useOutsideClickEvent(modalRef)

  return (
    <div>
      <Button
        onPress={() => setOpen(true)}
        className={css({
          bgColor: 'white',
          color: 'primary',
          borderRadius: 'md',
          outline: 'none',
          p: '1',
          mr: '1',

          _hover: {
            color: 'primary.200'
          }
        })}
      >
        <RiEdit2Line size={20} />
      </Button>

      <div
        className={css({
          display: isOpen ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          bgColor: 'rgba(0, 0, 0, 0.5)',
          width: '100vw',
          height: '100vh',

          animation: isOpen
            ? isClosing
              ? 'fadeOut 0.3s ease 0.3s 1 normal forwards'
              : 'fadeIn 0.3s ease 0s 1 normal forwards'
            : ''
        })}
      >
        <Dialog
          ref={modalRef}
          className={css({
            flexDirection: 'column',
            bgColor: 'white',
            borderWidth: '1px',
            borderColor: 'primary.300',
            borderRadius: 'md',
            p: '4',
            textAlign: 'left',

            animation: isOpen
              ? isClosing
                ? 'closeModal 0.5s ease 0s 1 normal forwards'
                : 'openModal 0.5s ease 0s 1 normal forwards'
              : ''
          })}
        >
          <Form onSubmit={handleSubmit(submit)}>
            <Heading
              slot='title'
              className={css({
                fontSize: '2xl',
                fontWeight: 'bold'
              })}
            >
              Edit Device "{deviceName}"
            </Heading>
            <FormField
              type='name'
              placeholder='Enter a name...'
              name='name'
              label='Device Name'
              register={register}
              error={errors.name}
            />

            <Button
              onPress={() => closeModal()}
              type='submit'
              className={css({
                bgColor: 'primary',
                color: 'white',
                borderRadius: 'md',
                width: '100%',
                p: '2',
                _hover: {
                  bgColor: 'primary',
                  color: 'white'
                }
              })}
            >
              Confirm
            </Button>
          </Form>
        </Dialog>
      </div>
    </div>
  )
}

export default AddDeviceForm
