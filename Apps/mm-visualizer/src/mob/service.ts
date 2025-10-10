import { Mob, NewMob} from ".";

export class MobService {
  public async getAll(cookie: string | undefined): Promise<Mob[]> {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:4020/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            query {
              getAll {
                id
                name
                image
                size
                description
                last_update
              }
            }
        `,
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            reject("Unauthorized");
            return;
          }
          return response.json();
        })
        .then((json) => {
          resolve(json.data.getAll);
        })
        .catch((error) => reject(error));
    });
  }
  public async getCount(cookie: string | undefined): Promise<number> {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:4020/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            query {
              getCount             
            }
        `,
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            reject("Unauthorized");
            return;
          }
          return response.json();
        })
        .then((json) => {
          resolve(json.data.getCount);
        })
        .catch((error) => reject(error));
    });
  }
  public async create(newMob: NewMob, cookie: string | undefined): Promise<Mob> {
    console.log(newMob)
    return new Promise((resolve, reject) => {
      fetch("http://localhost:4020/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            mutation ($mob: NewMob!) {
              create (mob: $mob) {
                id
                name
                image
                size
                description
                last_update
              }
            }
        `,
          variables: {
            mob: newMob,
          },
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            reject("Unauthorized");
            return;
          }
          return response.json();
        })
        .then((json) => {
          resolve(json.data.create);
        })
        .catch((error) => reject(error));
    });
  }
  public async update(mobId: string, newMob: NewMob, cookie: string | undefined): Promise<Mob> {
    console.log(newMob)
    return new Promise((resolve, reject) => {
      fetch("http://localhost:4020/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify({
          query: `
            mutation ($id: String!, $mob: NewMob!) {
              update (id: $id, mob: $mob) {
                id
                name
                image
                size
                description
                last_update
              }
            }
        `,
          variables: {
            id: mobId,
            mob: newMob,
          },
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            reject("Unauthorized");
            return;
          }
          return response.json();
        })
        .then((json) => {
          resolve(json.data.update);
        })
        .catch((error) => reject(error));
    });
  }
}
