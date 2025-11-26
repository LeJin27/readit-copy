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

vi.spyOn(AuthService.prototype, "validJwt")
  .mockResolvedValue({ id: "test-user" });


test("GET all communities", async () => {
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







