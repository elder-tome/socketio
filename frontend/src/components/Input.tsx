import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { error?: string; nameInput: string }

export default function Input({ error, nameInput, ...rest }: Props) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between">
        <label htmlFor={nameInput}>Mensagem</label>
        <span className={`${error && 'text-red-400'}`}>{error}</span>
      </div>
      <input
        className={`rounded-md border border-zinc-300 bg-white p-3 ${
          error && 'border-red-400'
        }`}
        id={nameInput}
        {...rest}
      />
    </div>
  )
}
