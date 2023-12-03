import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  // api/v1/下のリクエストは認証不要にする
  if (req.nextUrl.pathname.includes('/api/v1')) return

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [userName, password] = atob(authValue).split(':')

    if (
      userName === process.env.BASIC_AUTH_NAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
