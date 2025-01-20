import React, { useEffect } from 'react'
import EventEmitter from '../utils/EventEmitter'

const emitter = new EventEmitter()

const EventEmitterTest: React.FC = () => {
  useEffect(() => {
    const logData = (data: any) => {
      console.log('Received data:', data)
    }

    emitter.on('data', logData)

    emitter.emit('data', { message: 'Hello, world!' })

    emitter.emit('data', { message: 'Emit.' })

    return () => {
      emitter.off('data', logData)
      console.log('Listener removed')
    }
  }, [])

  return <div>Check the console for emitted data!</div>
}

export default EventEmitterTest
