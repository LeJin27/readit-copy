import { vi, test, beforeAll, afterAll, expect } from "vitest";
import * as http from "http";
import supertest from "supertest";
import { app, bootstrap } from "../src/app";
import { AuthService } from "../src/auth/service";

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
  vi.spyOn(AuthService.prototype, "check")
    .mockResolvedValue({ id: "test-user"});
  
  const accessToken = "doesnt matter"
  await supertest(server)
    .post("/graphql")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      query: `
        query ($id: String!, $ids: String!) {
          getById (id: $id, ids: $ids) 
        }
      `,
        variables: { id: "coolid", ids: "draon" },
      
    },
      
  
  )
    .then((res) => {
      console.log(res.body)
      //expect(res.body.data.getById).toBe("coolid");
    });
});


