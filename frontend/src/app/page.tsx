'use client'
import Form from '@/components/Form'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function Home() {
  const socket = io('http://localhost:3333') // Substitua pelo endereço do seu servidor Socket.IO
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO')

      // Lógica do cliente Socket.IO aqui
    })

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor Socket.IO')
    })

    socket.on('message', (message) => {
      console.log(message)
    })

    return () => {
      socket.disconnect() // Desconecta quando o componente é desmontado
    }
  }, [])

  function handleClick(message: string) {
    socket.send(message)
  }

  return (
    <main className="p-6">
      <Form />
      <button onClick={() => handleClick('teste passou')}>test</button>
    </main>
  )
}
