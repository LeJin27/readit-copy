import { vi, test, beforeAll, afterAll, expect, describe } from "vitest";
import * as http from "http";
import supertest from "supertest";
import * as db from "./db";
import { app, bootstrap } from "../src/app";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset();
  await bootstrap();
});

afterAll(() => {
  db.shutdown();
  server.close();
});
export function helperMockFetchOnce(jsonData: any, status = 200) {
  global.fetch = vi.fn().mockResolvedValueOnce({
    status,
    json: () => Promise.resolve(jsonData),
  });
}

test("Unauthorized access to member", async () => {
  await supertest(server)
    .post("/graphql")
    //.set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query {
          getAll 
        }
      `,
    })
    .then((res) => {
      expect(
        (res.body.errors[0].message =
          "Access denied! You don't have permission for this action!")
      );
    });
});

const expectedMob = {
  id: "50990564-ac2d-47b6-be71-f1f557878c0c",
  name: "carrion_eater_B",
  image: "random_image_url",
  size: 1,
  description: "not null",
  last_update: "2024-06-15T12:00:00+00:00"
};

test("Authorized access to template with valid jwt", async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    status: 200,
    json: () =>
      Promise.resolve({
        id: "user123",
        name: "John Doe",
        role: "doesnt matter",
      }),
  });
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + "random ass token")
    .send({
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
    })
    .then((res) => {
      console.log(res.body.data.getAll[0])
      console.log(expectedMob)
      expect(res.body.data.getAll[0]).toEqual(expectedMob);
    });
});

test("200: getCount return mob count", async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    status: 200,
    json: () =>
      Promise.resolve({
        id: "user123",
        name: "John Doe",
        role: "doesnt matter",
      }),
  });
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + "random ass token")
    .send({
      query: `
        query {
          getCount         
        }
      `,
    })
    .then((res) => {
      //console.log(res.body.data.getAll[0])
      //console.log(expectedMob)
      expect(res.body.data.getCount).toEqual(2);
    });
});

test("200: createMob return mob", async () => {
  helperMockFetchOnce({
    id: "user123",
    name: "John Doe",
    role: "doesnt matter",
  });
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + "random ass token")
    .send({
      query: `
        mutation  {
          create (mob: {
            name: "randomassname",
            size: 1
          }) {
          id
          name
            
          }
        }
      `,
    })
    .then((res) => {
      console.log(res.body);
      expect(res.body.data.create.name).toEqual("randomassname");
    });
});

test("200: createMob missing required parameters", async () => {
  helperMockFetchOnce({
    id: "user123",
    name: "John Doe",
    role: "doesnt matter",
  });
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + "random ass token")
    .send({
      query: `
        mutation  {
          create (mob: {
            size: 1
          }) {
          id
          name
            
          }
        }
      `,
    })
    .then((res) => {
      console.log(res.body)
        expect(res.body.errors[0].message).toEqual('Field "NewMob.name" of required type "String!" was not provided.');
    });
});


test("200: updateMob return mob", async () => {
  helperMockFetchOnce({
    id: "user123",
    name: "John Doe",
    role: "doesnt matter",
  });
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + "random ass token")
    .send({
      query: `
        mutation  {
          update (
          id : "50990564-ac2d-47b6-be71-f1f557878c0c",
          mob: {
            name: "randomassname",
            size: 1
          }) {
          id
          name
            
          }
        }
      `,
    })
    .then((res) => {
      console.log(res.body.data.update)
      expect(res.body.data.update).toStrictEqual({ id: '50990564-ac2d-47b6-be71-f1f557878c0c', name: 'randomassname' });
    });
});