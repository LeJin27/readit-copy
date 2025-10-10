import { vi, test, beforeAll, afterAll, expect } from "vitest";
import * as http from "http";
import supertest from "supertest";
import { app, bootstrap } from "../src/app";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await bootstrap();
});

afterAll(() => {
  server.close();
});



test("Unauthorized access to template", async () => {
  await supertest(server)
    .post("/graphql")
    //.set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          template 
        }
      `,
    })
    .then((res) => {
      expect(res.body.errors[0].message = "Access denied! You don't have permission for this action!");
    });
});

test("Unauthorized access to template with invalid jwt", async () => {
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + 'test')
    .send({
      query: `
        query {
          template 
        }
      `,
    })
    .then((res) => {
      expect(res.body.errors[0].message = "Access denied! You don't have permission for this action!");
    });
});

test("Authorized access to template with valid jwt", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
    status: 200,
    json: () =>
      Promise.resolve({
        id: 'user123',
        name: 'John Doe',
        role: 'admin',
      }),
  });

  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + 'random ass token')
    .send({
      query: `
        query {
          template 
        }
      `,
    })
    .then((res) => {
      expect(res.body.data.template).toEqual('AuthorizedTemplate')
    });
});