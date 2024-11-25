import { useNavigate } from '@remix-run/react'
import { useContext, useEffect } from 'react'
import { Button } from 'react-aria-components'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

import AddDeviceForm from '~/components/AddDeviceForm'
import EditDeviceForm from '~/components/EditDeviceForm'
import { DashboardContext, DashboardContextType } from '~/context/dashboard'
import { api } from '~/services/api'

const stylePage = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',

  width: '100%',
  p: '2'
})

const styleDeviceList = grid({
  columns: { base: 1, md: 2 },
  gap: '8',

  width: '100%',
  textAlign: 'center',
  p: '8'
})

const styleDeviceCard = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  p: '4',
  borderRadius: 'md',
  borderColor: 'primary.300',
  borderWidth: '1px',
  borderStyle: 'solid'
})

export default function DashboardDevices() {
  const {
    devices,
    setDevices,
    addDevice,
    deleteDevice,
    editDevice,
    generateData
  } = useContext(DashboardContext) as DashboardContextType
  const navigate = useNavigate()

  const addDeviceRequest = async (name: string) => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.post(
        '/device',
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            UserId: localStorage.getItem('userId')
          }
        }
      )
      addDevice(res.data.id, res.data.name)
    } catch (e: any) {
      if (e.response.status === 401) {
        console.log(e)
        localStorage.removeItem('token')
        navigate('/')
      }
    }
  }

  const deleteDeviceRequest = async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.delete(`/device/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          UserId: localStorage.getItem('userId')
        }
      })
      console.log(res.data)
      deleteDevice(id)
    } catch (e: any) {
      if (e.response.status === 401) {
        console.log(e)
        localStorage.removeItem('token')
        navigate('/')
      }
    }
  }

  const editDeviceRequest = async (name: string, id: number) => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.put(
        `/device/${id}`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            UserId: localStorage.getItem('userId')
          }
        }
      )

      editDevice(res.data)
    } catch (e: any) {
      if (e.response.status === 401) {
        console.log(e)
        localStorage.removeItem('token')
        navigate('/')
      }
    }
  }

  useEffect(() => {
    const getDevices = async () => {
      try {
        const res = await api.get('/device', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            UserId: localStorage.getItem('userId')
          }
        })

        const deviceList = res.data.devices

        setDevices(deviceList)
        generateData(deviceList)
      } catch (e: any) {
        console.log(e)
        if (e.response.status === 401) {
          localStorage.removeItem('token')
          navigate('/')
        }
      }
    }

    getDevices()
  }, [])

  return (
    <div className={stylePage}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: { base: 'space-between', lg: 'flex-start' },
          alignItems: 'center',
          width: '100%',
          p: '2'
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            mr: { lg: '4' }
          })}
        >
          Dashboard Devices
        </h1>

        <AddDeviceForm onSubmit={addDeviceRequest} />
      </div>

      <div className={styleDeviceList}>
        {devices.map((device) => (
          <div key={device.id} className={styleDeviceCard}>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                p: '2'
              })}
            >
              <h2
                className={css({
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  fontSize: 'lg',
                  fontWeight: 'bold'
                })}
              >
                <EditDeviceForm
                  deviceName={device.name}
                  deviceId={device.id}
                  onSubmit={editDeviceRequest}
                />
                {device.name}
                <p
                  className={css({
                    fontSize: 'sm',
                    fontWeight: 'normal',
                    ml: '1',
                    color: 'gray.500'
                  })}
                >
                  {device.id}
                </p>
              </h2>
              <Button
                onPress={() => deleteDeviceRequest(device.id)}
                className={css({
                  bgColor: 'white',
                  color: 'primary',
                  borderColor: 'primary',
                  borderWidth: '1px',
                  borderRadius: 'md',
                  outline: 'none',
                  p: '1',

                  _hover: {
                    bgColor: 'primary',
                    color: 'white'
                  }
                })}
              >
                <RiDeleteBin5Line size={20} />
              </Button>
            </div>
            <div>
              <ul>
                <li>Temperature: {device.temperature?.toPrecision(5)} °C</li>
                <li>
                  Energy Consumption: {device.energyConsumption?.toPrecision(5)}{' '}
                  kWh
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
