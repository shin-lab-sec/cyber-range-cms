import { NextRequest, NextResponse } from 'next/server'

// /articles/配下と/api/配下以外の全てのページにBasic認証をかける
export const config = {
  // 発火するパスを指定
  matcher: ['/', '/courses/:path*', '/useragents/:path'],
}

// ページアクセス時に、サーバー側で発火する処理
export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  // Basic認証の処理
  if (basicAuth) {
    // Basic認証で入力した値を取得
    const authValue = basicAuth.split(' ')[1]
    const [userName, password] = atob(authValue).split(':')

    // 入力した値があっていれば、アクセスするページを表示
    if (
      userName === process.env.BASIC_AUTH_NAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
  }
  // Basic認証が機能しなかった時
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
