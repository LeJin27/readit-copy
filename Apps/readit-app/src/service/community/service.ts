import { Community } from "../../types"

export class CommunityService {
  public async getAll(cookie: string | undefined): Promise<Community[]> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4020/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            query {
              getAll {
                id
                name
                description
              }
            }
        `,
        }),
      })
        .then(response => {
          if (response.status !== 200) {
            reject('Unauthorized')
            return
          }
          return response.json()
        })
        .then(json => {
          console.log("GraphQL response (communities):", json);
          resolve(json.data.getAll)
        })
        .catch((error) => reject(error))
    })
  }


}