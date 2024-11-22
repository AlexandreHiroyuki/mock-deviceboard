import type { MetaFunction } from '@remix-run/node'
import { Button, Form } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

import { zodResolver } from '@hookform/resolvers/zod'
import FormField from '~/components/FormField'
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

  const onSubmit = async (data: FormData) => {
    console.log('SUCCESS', data)
  }

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
        <Form onSubmit={handleSubmit(onSubmit)} className={styleAuthForm}>
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
