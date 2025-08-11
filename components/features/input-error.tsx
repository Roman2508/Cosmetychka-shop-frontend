import z from "zod"
import { FC } from "react"

interface Props {
  errors:
    | z.core.$ZodFormattedError<
        {
          name: string
          phone: string
          comment?: string | undefined
        },
        string
      >
    | undefined
  inputKey: string
}

const InputError: FC<Props> = ({ errors, inputKey }) => {
  return (
    <p className="text-destructive text-sm mt-1">
      {typeof errors?.[inputKey as keyof typeof errors] === "object" &&
        "_errors" in (errors[inputKey as keyof typeof errors] ?? {}) &&
        (errors[inputKey as keyof typeof errors] as { _errors: string[] })._errors[0]}
    </p>
  )
}

export default InputError
