import type { MetaFunction } from '@remix-run/node'
import {
  Button,
  Form,
  Input,
  Label,
  Text,
  TextField
} from 'react-aria-components'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

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
  justifyContent: 'center',
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

const styleFormInput = css({
  fontSize: 'md',
  p: '1',
  mt: '1',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'gray'
})

const styleFormInputDescription = css({
  fontSize: 'xs',
  color: 'gray'
})

export const meta: MetaFunction = () => {
  return [{ title: 'Mock Devboard' }]
}

export default function Index() {
  return (
    <div className={styleIndexGrid}>
      <div className={styleBannerBox}>
        <h1
          className={css({
            fontSize: '6xl',
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
        <Form className={styleAuthForm}>
          <h2
            className={css({
              fontSize: '2xl',
              fontWeight: 'bold',

              textAlign: 'center'
            })}
          >
            Start Now! Don't be left out of the IoT's unstoppable innovation.
          </h2>

          <TextField name='email' type='email' className={styleFormInputField}>
            <Label className={styleFormInputLabel}>Email</Label>
            <Input className={styleFormInput} />
            <Text slot='description' className={styleFormInputDescription}>
              Email must be in a valid format.
            </Text>
          </TextField>

          <TextField
            name='password'
            type='password'
            className={styleFormInputField}
          >
            <Label className={styleFormInputLabel}>Password</Label>
            <Input className={styleFormInput} />
            <Text slot='description' className={styleFormInputDescription}>
              Password must be at least 8 characters.
            </Text>
          </TextField>

          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
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
