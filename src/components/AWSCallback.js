import { redirect } from "react-router-dom"
import { API_URL } from "../constants"

export async function loader({ request }) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (!code || code === null) {
    redirect("/404")
  }

  const res = await fetch(`${API_URL}/exchange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ Code: code }),
  })

  if (res.status !== 200) {
    throw new Response("API request failed.", { status: res.status })
  }

  try {
    const tokens = await res.json()
    const {
      Tokens: { access_token, id_token, refresh_token, token_type },
    } = tokens

    sessionStorage.setItem("access_token", access_token)
    sessionStorage.setItem("id_token", id_token)
    sessionStorage.setItem("refresh_token", refresh_token)
    sessionStorage.setItem("token_type", token_type)

    localStorage.setItem("access_token", access_token)
    localStorage.setItem("id_token", id_token)
    localStorage.setItem("refresh_token", refresh_token)
    localStorage.setItem("token_type", token_type)

    return redirect("/")
  } catch (err) {
    // sessionStorage.removeItem("access_token")
    // sessionStorage.removeItem("id_token")
    // sessionStorage.removeItem("refresh_token")
    // sessionStorage.removeItem("token_type")
    console.error(err)

    throw new Response(
      `Authentication Failed. ${err.message} ${err?.request?.responseURL} `,
      {
        status: err?.response?.status || 500,
      }
    )
  }
}

function AWSCallback() {
  return <div>Please wait...</div>
}

export default AWSCallback
