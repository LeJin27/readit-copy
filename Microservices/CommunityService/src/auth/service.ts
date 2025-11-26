import { SessionUser } from '../../types/index';

export class AuthService {
  public async check(authHeader?: string): Promise<SessionUser> {
    return new Promise((resolve, reject) => {
      const token = authHeader?.split(' ')[1]
      fetch('http://localhost:3010/api/v0/auth/validJwt', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => {
          if (response.status != 200) {
            reject('Unauthorized')
          }
          return response.json()
        }
        )
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}