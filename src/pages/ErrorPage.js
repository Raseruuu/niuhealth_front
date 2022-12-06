import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p>{error.data || error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <p>{error.data || error.message || JSON.stringify(error, null, 4)}</p>
    </div>
  )
}
