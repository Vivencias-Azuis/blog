import { useId } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type BaseProps = {
  label: string
  helperText?: string
  error?: string
  rows?: number
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  textarea?: false
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  textarea: true
  rows?: number
}

type FormFieldProps = BaseProps & (InputProps | TextareaProps)

export default function FormField({
  label,
  helperText,
  error,
  textarea,
  rows = 4,
  id,
  ...props
}: FormFieldProps) {
  const generatedId = useId()
  const fieldId = id || generatedId

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="text-sm font-semibold text-sand-900">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={fieldId}
          rows={rows}
          className="w-full rounded-input border border-sand-200 bg-surface px-3 py-2 text-sm text-sand-800 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className="w-full rounded-input border border-sand-200 bg-surface px-3 py-2 text-sm text-sand-800 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {helperText && !error && <p className="text-xs text-sand-600">{helperText}</p>}
      {error && <p className="text-xs text-state-error">{error}</p>}
    </div>
  )
}
