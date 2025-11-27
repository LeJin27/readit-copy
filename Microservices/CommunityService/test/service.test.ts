import {CommunityService} from "../src/community/service";
import {vi, beforeAll, afterAll, test, expect} from "vitest";
import request from "supertest";
import { app, bootstrap } from "../src/app";  
import { AuthService } from "../src/auth/service";
import * as db from "./db";


let server: any

beforeAll(async () => {
  await bootstrap();             
  server = app.listen(0);        
  await db.reset()
});
afterAll(async() => {
  server.close();
  await db.shutdown()
});


test("GET all communities", async () => {
  vi.spyOn(AuthService.prototype, "check")
    .mockResolvedValue({ id: "test-user" });

  const query = `
    query {
      getAll {
        id
        name
        created_at
        created_by
        description
      }
    }
  `;

  const res = await request(server)
    .post("/graphql")
    .send({ query });

  console.log(res.body.data);
  const data = res.body.data
  expect(data.getAll.length == 2)

});




test("Unauthorized error", async () => {
  vi.spyOn(AuthService.prototype, "check")
    .mockRejectedValue(new Error("Unauthorized"));

  const query = `
    query {
      getAll {
        id
        name
      }
    }
  `;

  const res = await request(server)
    .post("/graphql")
    .send({ query });

  console.log(res.body);

});





test("GET communities by id", async () => {
  vi.spyOn(AuthService.prototype, "check")
    .mockResolvedValue({ id: "test-user" });

  const query = `
    query {
      getById(id: "50990564-ac2d-47b6-be71-f1f557878c0c") {
        id
        name
        created_at
        created_by
        description
      }
    }
  `;

  const res = await request(server)
    .post("/graphql")
    .send({ query });

  console.log(JSON.stringify(res.body, null, 2));

});