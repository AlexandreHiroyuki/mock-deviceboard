import { createContext, useState } from 'react'

import { randomSummatoryGenerator } from '~/utils/data.generator'

export type Device = {
  id: number
  name: string
  temperature?: number
  energyConsumption?: number
}

export type DashboardContextType = {
  devices: Device[]
  setDevices: (devices: Device[]) => void
  addDevice: (deviceId: number, deviceName: string) => void
  deleteDevice: (id: number) => void
  editDevice: (device: Device) => void
  generateData: (deviceList: Device[]) => void
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

export const DashboardContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Loading...' },
    { id: 2, name: 'Loading...' }
  ])

  const generator = new randomSummatoryGenerator(30, -10, 100)

  const generateData = (deviceList: Device[]) => {
    setDevices(
      deviceList.map((device: Device) => {
        const temperature = generator.generate(10)
        const energyConsumption = Math.pow((temperature + 10) / 90, 2)
        device['temperature'] = temperature
        device['energyConsumption'] = energyConsumption
        return device
      })
    )
  }

  const addDevice = (deviceId: number, deviceName: string) => {
    const temperature = generator.generate(10)
    const energyConsumption = Math.pow((temperature + 10) / 90, 2)
    setDevices([
      ...devices,
      {
        id: deviceId,
        name: deviceName,
        temperature: temperature,
        energyConsumption: energyConsumption
      }
    ])
  }

  const deleteDevice = (id: number) => {
    setDevices(devices.filter((device) => device.id !== id))
  }

  const editDevice = (device: any) => {
    const temperature = generator.generate(10)
    const energyConsumption = Math.pow((temperature + 10) / 90, 2)
    setDevices(
      devices.map((d) => {
        if (d.id === device.id) {
          return {
            name: device.name,
            id: device.id,
            temperature: temperature,
            energyConsumption: energyConsumption
          }
        }
        return d
      })
    )
  }

  return (
    <DashboardContext.Provider
      value={{
        devices,
        setDevices,
        addDevice,
        deleteDevice,
        editDevice,
        generateData
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
