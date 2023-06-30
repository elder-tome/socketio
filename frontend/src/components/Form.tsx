'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import socket from '../server/socket'
import Input from './Input'

type Inputs = {
  message: string
}

type Message = {
  id: string
  message: string
}

export default function Form() {
  const [data, setData] = useState<Message[]>([])

  const divRef = useRef<HTMLDivElement>(null)

  const schema = yup.object({
    message: yup.string(),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { message: '' },
  })

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO')
    })

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor Socket.IO')
    })

    socket.on('message', (message) => {
      setData((state) => [...state, message])
      console.log(message)
      setTimeout(() => {
        if (divRef.current) {
          const chatContainer = divRef.current
          // chatContainer.scrollTop = chatContainer.scrollHeight
          const lastMessage = chatContainer.lastElementChild
          if (lastMessage) {
            lastMessage.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            })
          }
        }
      }, 100)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    socket.send({ id: socket.id, message: data.message })
    reset()
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <h1>Chat</h1>
      <div className="rounded-lg bg-zinc-300 pb-6 pl-6 pr-1 pt-6">
        <div
          ref={divRef}
          className="flex h-96 flex-col gap-4 overflow-y-scroll pr-5"
        >
          {data.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.id === socket.id ? 'justify-start' : 'justify-end'
              }`}
            >
              <p
                className={`rounded-full px-4 py-2 text-white ${
                  message.id === socket.id ? 'bg-blue-700' : 'bg-blue-500'
                }`}
              >
                {message.message}
              </p>
            </div>
          ))}
        </div>
      </div>
      <form
        className="flex items-end space-x-4 space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Digite sua mensagem"
              value={field.value}
              onChange={field.onChange}
              error={errors.message?.message}
              nameInput={field.name}
            />
          )}
        />
        <button
          className="mb-[1px] rounded-lg bg-blue-700 p-[13px] text-zinc-50"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
