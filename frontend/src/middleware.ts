import { NextRequest, NextResponse } from 'next/server'

// /articles/配下と/api/配下以外の全てのページにBasic認証をかける
export const config = {
  matcher: ['/', '/courses/:path*', '/useragents/:path'],
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

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
