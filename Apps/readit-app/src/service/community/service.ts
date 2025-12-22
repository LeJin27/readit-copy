import { Community, GraphQLVariables, NewCommunity } from "../../types";

const url = "http://localhost:4020/graphql";
export class CommunityService {
  private async helperGraphFetch<
    TResponse,
    TVariables extends GraphQLVariables | undefined = undefined,
  >(
    cookie: string | undefined,
    query: string,
    variables?: TVariables,
  ): Promise<TResponse> {
    const url = "http://localhost:4020/graphql";
    //console.log(
    //  "GraphQL request body:",
    //  JSON.stringify({ query, variables }, null, 2),
    //);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { Authorization: `Bearer ${cookie}` }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (response.status !== 200) {
      throw new Error("Unauthorized");
    }

    const json = (await response.json()) as {
      data?: TResponse;
      errors?: Array<{ message: string }>;
    };

    if (json.errors && json.errors.length > 0) {
      throw new Error(json.errors[0].message);
    }

    if (!json.data) {
      throw new Error("Missing data");
    }

    return json.data;
  }

  public async getAll(cookie: string | undefined): Promise<Community[]> {
    const query = `
    query {
      getAll {
        id
        name
        description
      }
    }
  `;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { Authorization: `Bearer ${cookie}` }),
      },
      body: JSON.stringify({
        query,
      }),
    })
    const responseJson  =  await response.json()
    return responseJson.data.getAll

  }
  public async getById(idVar: string, cookie?: string) {
    const query = `
      query($id: String!) {
        getById(id: $id) {
          id
          name
          description
          created_at
          created_by
          privacy
          image_url
          tags
        }
      }
    `;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { Authorization: `Bearer ${cookie}` }),
      },
      body: JSON.stringify({
        query, variables: {
          id: idVar
        }
      }),
    })
    const responseJson  =  await response.json()
    return responseJson.data.getById
  }

  
  public async create(newCommunity: NewCommunity, cookie?: string) {
    const query = `
      mutation ($inputArg: NewCommunity!) {
        create (NewCommunityArg: $inputArg){
          id
          name
          created_at
          created_by
          description
        }
      }
    `;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { Authorization: `Bearer ${cookie}` }),
      },
      body: JSON.stringify({
        query, variables: {
          inputArg: newCommunity
        }
      }),
    })
    const responseJson  =  await response.json()
    console.log(responseJson)
    return responseJson.data.create

    // can be anythign but it shoudl sut contain our variables
  }
  
}
