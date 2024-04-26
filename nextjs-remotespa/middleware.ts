import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: [],
};

export async function middleware(req: NextRequest) {
  // ...

  return NextResponse.next(req);
}
