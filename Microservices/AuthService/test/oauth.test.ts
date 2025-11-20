import { test, beforeAll, afterAll, beforeEach, expect, vi } from "vitest";
import supertest from "supertest";
import * as http from "http";
import * as db from "./db";
import dotenv from "dotenv";
dotenv.config()

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  return db.reset();
});

afterAll(() => {
  db.shutdown();
  if (server) server.close();
});

beforeEach(async () => {
  await db.reset();
  vi.resetModules(); // Critical to make dynamic import reload fresh
});

const validCredentials = {
  token: "mocked-token",
};

test("Serves API Docs", async () => {
  // have to import app in order to utilize domock
  const { default: app } = await import("../src/app");
  server = http.createServer(app);
  server.listen();
  await supertest(server)
    .get("/api/v0/docs/")
    .expect(200)
    .expect("Content-Type", /text\/html/);
});

test("200 Logged in: User can login with valid google token", async () => {
  // do mock has to be called before a module is imported for it to take effect. The app is only initialized after domock
  vi.doMock("google-auth-library", () => {
    return {
      OAuth2Client: vi.fn().mockImplementation(() => ({
        verifyIdToken: vi.fn().mockResolvedValue({
          getPayload: () => ({
            email: "molly@books.com",
            name: "Molly Member",
            sub: "unique-google-id",
          }),
        }),
      })),
    };
  });
  const { default: app } = await import("../src/app");
  server = http.createServer(app);
  server.listen();
  const res = await supertest(server)
    .post("/api/v0/auth/google-login/")
    .send(validCredentials)
    .expect(200);

  expect(res.body).toHaveProperty("email", "molly@books.com");
});


test("200 Logged in: User can signup with valid google token", async () => {
  // do mock has to be called before a module is imported for it to take effect. The app is only initialized after domock
  vi.doMock("google-auth-library", () => {
    return {
      OAuth2Client: vi.fn().mockImplementation(() => ({
        verifyIdToken: vi.fn().mockResolvedValue({
          getPayload: () => ({
            email: "bob@books.com",
            name: "Bob Member",
            sub: "unique-google-id-2",
          }),
        }),
      })),
    };
  });
  const { default: app } = await import("../src/app");
  server = http.createServer(app);
  server.listen();
  const res = await supertest(server)
    .post("/api/v0/auth/google-login/")
    .send(validCredentials)
    .expect(200)

  expect(res.body).toHaveProperty("email", "bob@books.com");
});

