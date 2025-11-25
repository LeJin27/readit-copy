import { vi, test, beforeAll, afterAll, expect, afterEach } from "vitest";
import * as http from "http";
//import * as db from './db'
import { app, bootstrap } from "../src/app";
import { AuthService } from "../src/auth/service";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  //await db.reset()
  await bootstrap();
});

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  //db.shutdown()
  server.close();
});


test('should resolve with user data when fetch returns 200', async () => {
  // replaces featch with mocked json
  global.fetch = vi.fn().mockResolvedValueOnce({
    status: 200,
    json: () =>
      Promise.resolve({
        id: 'user123',
        name: 'John Doe',
        role: 'admin',
      }),
  });

  const authHeader = 'Bearer mockToken';
  const authService = new AuthService();
  const result = await authService.validJwt(authHeader);
  console.log(result)

  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3010/api/v0/auth/validJwt', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer mockToken',
    },
  });
});