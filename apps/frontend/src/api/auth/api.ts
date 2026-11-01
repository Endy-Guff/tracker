import ky from 'ky'

const BASE = '/api'

export const login = (loginName: string, password: string): Promise<{ authenticated: boolean }> =>
  ky.post(`${BASE}/auth/login`, { json: { login: loginName, password } }).json()

export const getMe = (): Promise<{ authenticated: boolean }> =>
  ky.get(`${BASE}/auth/me`).json()

export const logout = (): Promise<void> =>
  ky.post(`${BASE}/auth/logout`).then(() => undefined)