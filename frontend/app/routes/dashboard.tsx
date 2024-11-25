import { Link, Outlet, useLocation, useNavigate } from '@remix-run/react'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-aria-components'
import {
  RiFileList3Line,
  RiHome4Line,
  RiLogoutBoxLine,
  RiMenuFill
} from 'react-icons/ri'
import { css } from 'styled-system/css'

import { DashboardContext, DashboardContextProvider } from '~/context/dashboard'

const styleDashboardLayout = css({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden'
})

const styleDashboardHeader = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: '2',

  borderBottomWidth: '1px',
  borderColor: { base: 'primary.200' }
})

const styleDashboardMenuLink = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  borderRadius: 'md',
  p: '2',
  mb: '2',

  color: 'black',
  fontSize: '1.1em',
  outline: 'none',

  _hover: {
    bgColor: 'primary.500',
    color: 'white'
  }
})

const styleDashboardBody = css({
  display: 'flex',
  flexDirection: 'row'
})

const styleDashboardPage = css({
  height: 'calc(100vh - 40px)',
  width: '100%',
  overflow: 'scroll'
})

export default function Dashboard() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const styleDashboardMenu = css({
    position: { base: 'fixed', lg: 'relative' },

    boxSizing: 'border-box',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    width: { base: '60vw', lg: '20vw' },
    height: 'calc(100vh - 40px)',
    p: '3',
    bgColor: 'primary.50',

    transition: 'transform 0.2s ease-in-out',
    transform: {
      base: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
      lg: 'translateX(0)'
    }
  })

  function useOutsideClickEvent(ref: React.RefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  useOutsideClickEvent(menuRef)

  const signOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      return navigate('/')
    }
    if (
      location.pathname === '/dashboard' ||
      location.pathname === '/dashboard/'
    ) {
      navigate('/dashboard/devices')
    }
  }, [])

  return (
    <DashboardContextProvider>
      <div className={styleDashboardLayout}>
        <header className={styleDashboardHeader}>
          <Button
            onPress={() => setMenuOpen(!isMenuOpen)}
            className={css({
              bgColor: 'white',
              color: 'primary',
              borderColor: 'primary',
              borderWidth: '1px',
              borderRadius: 'md',
              outline: 'none',
              p: '2',
              display: { base: 'block', lg: 'none' },
              _hover: {
                bgColor: 'primary',
                color: 'white'
              }
            })}
          >
            <RiMenuFill size={22} />
          </Button>
          <h1
            className={css({
              fontSize: '2xl',
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

          <Button
            onPress={signOut}
            className={css({
              bgColor: 'white',
              color: 'primary',
              borderColor: 'primary',
              borderWidth: '1px',
              borderRadius: 'md',
              outline: 'none',
              p: '2',
              _hover: {
                bgColor: 'primary',
                color: 'white'
              }
            })}
          >
            <RiLogoutBoxLine size={22} />
          </Button>
        </header>

        <div className={styleDashboardBody}>
          <nav ref={menuRef} className={styleDashboardMenu}>
            <Link to={'/dashboard/devices'} className={styleDashboardMenuLink}>
              <RiHome4Line
                size={22}
                className={css({
                  mr: '2'
                })}
              />
              Devices
            </Link>

            <Link to={'/dashboard/report'} className={styleDashboardMenuLink}>
              <RiFileList3Line
                size={22}
                className={css({
                  mr: '2'
                })}
              />
              AI Report
            </Link>
          </nav>
          <div className={styleDashboardPage}>
            <Outlet context={DashboardContext} />
          </div>
        </div>
      </div>
    </DashboardContextProvider>
  )
}
