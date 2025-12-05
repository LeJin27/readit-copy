import { Community, GraphQLVariables } from "../../types";

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
    console.log(
  "GraphQL request body:",
  JSON.stringify({ query, variables }, null, 2),
);

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

  public async getAll(cookie: string | undefined) {
    const query = `
    query {
      getAll {
        id
        name
        description
      }
    }
  `;
    const data = await this.helperGraphFetch<{ getAll: Community[] }>(
      cookie,
      query,
    );
    return data.getAll;
  }
  public async getById(id: string, cookie?: string) {
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

    // can be anythign but it shoudl sut contain our variables
    type genericVars = { id: string };

    const data = await this.helperGraphFetch<{ getById: Community }, genericVars>(
      cookie,
      query,
      { id },
    );

    return data.getById;
  }
}
