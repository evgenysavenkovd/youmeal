import { ICredentials } from '@common/interfaces';
import { cookiesKeys } from '@query';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const refreshRedirect = refreshMiddleware(request);
  if (refreshRedirect) return refreshRedirect;
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function refreshMiddleware(
  request: NextRequest
): Promise<NextResponse | undefined> {
  const accessToken = request.cookies.get(cookiesKeys.accessToken)?.value;
  const refreshToken = request.cookies.get(cookiesKeys.refreshToken)?.value;
  if (accessToken && refreshToken) {
    const { data: user } = await axios
      .get(`${baseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .catch(() => ({ data: undefined }));
    if (!user) {
      const credentials = await refresh(refreshToken);
      if (credentials) {
        request.cookies.set(cookiesKeys.accessToken, credentials.accessToken);
        request.cookies.set(cookiesKeys.refreshToken, credentials.refreshToken);
        const response = NextResponse.next({ request });
        response.cookies.set(cookiesKeys.accessToken, credentials.accessToken);
        response.cookies.set(
          cookiesKeys.refreshToken,
          credentials.refreshToken
        );
        return response;
      } else {
        const rewriteUrl = new URL('/', request.url);
        const response = NextResponse.redirect(rewriteUrl);
        response.cookies.delete(cookiesKeys.accessToken);
        response.cookies.delete(cookiesKeys.refreshToken);
        return response;
      }
    }
  }
  return;
}

async function refresh(
  refreshToken: string
): Promise<ICredentials | undefined> {
  const { data: credentials } = await axios
    .post<ICredentials>(`${baseUrl}/auth/refresh`, { refreshToken })
    .catch(() => ({ data: undefined }));
  return credentials;
}
