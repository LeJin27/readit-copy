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