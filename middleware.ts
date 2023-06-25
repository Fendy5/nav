import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // console.log('localStorage', window.localStorage)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
