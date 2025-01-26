import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ServerError } from '@/types'

interface ErrorDisplayProps {
  error: ServerError
  title?: string
  showDetails?: boolean
  className?: string
}

export function ErrorDisplay({ error, title, showDetails = process.env.NODE_ENV === 'development', className }: ErrorDisplayProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title || "An error occurred"}</AlertTitle>
      <AlertDescription>
        <p>{error.message}</p>
        {error.validationErrors && error.validationErrors.length > 0 && (
          <ul className="mt-2 list-disc pl-5">
            {error.validationErrors.map((validationError, index) => (
              <li key={index}>
                {validationError.field ? `${validationError.field}: ` : ''}{validationError.message}
                {validationError.code && <span className="text-xs ml-1">({validationError.code})</span>}
              </li>
            ))}
          </ul>
        )}
        {showDetails && error.details && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
            <pre className="mt-2 whitespace-pre-wrap text-sm bg-destructive/10 p-2 rounded">
              {JSON.stringify(error.details, null, 2)}
            </pre>
          </details>
        )}
        {error.code && (
          <p className="mt-2 text-sm">
            Error Code: <code className="bg-destructive/20 px-1 py-0.5 rounded">{error.code}</code>
          </p>
        )}
      </AlertDescription>
    </Alert>
  )
}
