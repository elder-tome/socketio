'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Input from './Input'

const schema = yup.object({
  message: yup.string().required('Envie uma mensagem'),
})

type Inputs = {
  message: string
}

export default function Form() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { message: '' },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <h1>Chat</h1>
      <div className="flex h-96 flex-col gap-4 rounded-lg bg-zinc-300 p-6">
        <div className="flex justify-start">
          <p className="rounded-full bg-blue-700 px-4 py-2 text-white">oi</p>
        </div>
        <div className="flex justify-start">
          <p className="rounded-full bg-blue-700 px-4 py-2 text-white">
            Tudo bom ?
          </p>
        </div>
        <div className="flex justify-end">
          <p className="rounded-full bg-blue-500 px-4 py-2 text-white">oi</p>
        </div>
        <div className="flex justify-end">
          <p className="rounded-full bg-blue-500 px-4 py-2 text-white">
            Tudo, e com vc?
          </p>
        </div>
      </div>
      <form
        className="flex items-end space-x-4"
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
