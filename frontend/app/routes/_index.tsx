import { zodResolver } from '@hookform/resolvers/zod'
import type { MetaFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Dialog,
  Form,
  Heading,
  OverlayArrow,
  Popover
} from 'react-aria-components'
import { useForm } from 'react-hook-form'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

import FormField from '~/components/FormField'
import { api } from '~/services/api'
import { FormData, UserSchema } from '~/types'

const styleIndexGrid = grid({
  columns: { base: 1, lg: 2 },
  gap: '1',

  height: '100vh',
  width: '100vw',
  textAlign: 'center',
  p: '8'
})

const styleBannerBox = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: { base: 'flex-end', lg: 'center' },
  alignItems: 'center'
})

const styleAuthBox = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  my: 'auto',
  py: '6',

  lg: {
    borderLeftWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'primary.500'
  }
})

const styleAuthForm = css({
  maxWidth: '70%',
  textAlign: 'left'
})

const stylePopover = css({
  bgColor: 'red.300',
  borderColor: 'red.900',
  borderWidth: '1px',
  borderRadius: 'md',
  borderStyle: 'none',
  outline: 'none',

  maxWidth: '250px',

  p: '4'
})

const stylePopoverArrow = css({
  display: 'block',
  fill: 'red.300'
})

export const meta: MetaFunction = () => {
  return [{ title: 'Mock Devboard' }]
}

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema) // Apply the zodResolver
  })
  const navigate = useNavigate()

  const [submitType, setSubmitType] = useState('signin')
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const triggerRef = useRef(null)

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data, `/${submitType}`)
      const response = await api.post(`/${submitType}`, { params: data }) // Make a POST request

      localStorage.setItem('token', response.data) // Store the token in the local storage
      setPopoverOpen(false)
      navigate('/dashboard') // Redirect to the dashboard
    } catch (error: any) {
      const errorBody = error.response.data

      setError(errorBody.type, { message: errorBody.message }) // Set the error

      if (errorBody.type === 'form' || errorBody.type === 'api') {
        setPopoverOpen(true)
        setErrorMessage(`${error.status}: ${errorBody.message}.`)
      } else {
        setPopoverOpen(false)
      }
      console.error('Submitting form failed!', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      console.log('Token:', token)
    }
  }, [])

  return (
    <div className={styleIndexGrid}>
      <div className={styleBannerBox}>
        <h1
          className={css({
            fontSize: { base: '4xl', lg: '6xl' },
            fontWeight: 'bold'
          })}
        >
          <b
            className={css({
              fontWeight: 'bold',
              color: 'primary'
            })}
          >
            Mock
          </b>
          Devboard
        </h1>
        <p>Connect, Watch, and Report real and mock devices...</p>

        <section
          className={css({
            py: '8',
            textAlign: 'left'
          })}
        >
          <p>• Connect your devices.</p>
          <p>• Observability over your devices' data.</p>
          <p>• Compare the data with mock devices' functions.</p>
          <p>
            • Generate automated reports about your devices' status with{' '}
            <b>AI</b>.
          </p>
        </section>
      </div>

      <div className={styleAuthBox}>
        <Popover
          triggerRef={triggerRef}
          isOpen={isPopoverOpen}
          onOpenChange={setPopoverOpen}
          placement='top'
          className={stylePopover}
        >
          <OverlayArrow className={stylePopoverArrow}>
            <svg width={12} height={12} viewBox='0 0 12 12'>
              <path d='M0 0 L6 6 L12 0' />
            </svg>
          </OverlayArrow>
          <Dialog>
            <Heading slot='title'>
              <span>{errorMessage}</span>
            </Heading>
          </Dialog>
        </Popover>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          ref={triggerRef}
          className={styleAuthForm}
        >
          <h2
            className={css({
              fontSize: '2xl',
              fontWeight: 'bold',

              textAlign: 'center'
            })}
          >
            Start Now! Don't be left out of the IoT's unstoppable innovation.
          </h2>

          <FormField
            type='email'
            placeholder='Enter an email...'
            name='email'
            label='Email'
            register={register}
            error={errors.email}
          />

          <FormField
            type='password'
            placeholder='Enter a password...'
            name='password'
            label='Password'
            register={register}
            error={errors.password}
          />

          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

              pt: '4'
            })}
          >
            <Button
              onPress={() => setSubmitType('signin')}
              type='submit'
              className={css({
                borderRadius: 'md',
                p: '2',
                width: '45%',
                bg: 'primary',
                color: 'white'
              })}
            >
              Sign In
            </Button>

            <Button
              onPress={() => setSubmitType('signup')}
              type='submit'
              className={css({
                borderRadius: 'md',
                p: '2',
                width: '45%',
                bg: 'black',
                color: 'white'
              })}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
