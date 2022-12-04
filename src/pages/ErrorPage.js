import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.status >= 500 ? <p>Something went wrong...</p> : null}
        <p>
          {error.status} {error.data || error.message}
        </p>
      </div>
    )
  }
}
