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


test("GET all communities if contains user role", async () => {
  const url = "http://localhost:3010/api/v0/auth/login"
  const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
      "Content-Type": "application/json", 
      },
      body: JSON.stringify({email: "molly@books.com", password: "mollymember"}),
  });
  const json = await response.json();
  console.log(json)
  const token = json.accessToken;


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
    .send({ query })
    .set("Authorization", "Bearer " + token)

  console.log(JSON.stringify(res.body, null, 2));
});



