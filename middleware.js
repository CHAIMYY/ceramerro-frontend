import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Get path name
  const path = request.nextUrl.pathname

  // Get token from cookies
  const token = request.cookies.get('token')?.value
  const userType = request.cookies.get('userType')?.value

  // Define protected routes
  const isSellerRoute = path.startsWith('/seller')
  const isAdminRoute = path.startsWith('/admin')
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/register')

  // Handle protected routes
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check user type for specific routes
    if (isSellerRoute && userType !== 'artisan' && userType !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAdminRoute && userType !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && token) {
    if (userType === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/shop', request.url))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/seller/:path*',
    '/admin/:path*',
    '/login',
    '/register'
  ]
}
