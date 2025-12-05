import { expect, test } from "vitest";
import { AuthService } from "../service/auth/service";

test("User able to successfuly login", async () => {
  const service = await new AuthService().login({
    email: "molly@books.com",
    password: "mollymember",
  });
  console.log(service);
  expect(service?.email).toBe("molly@books.com");
});

test("User jwt is valid", async () => {
  const user = await new AuthService().login({
    email: "molly@books.com",
    password: "mollymember",
  });
  const cookie = user?.accessToken;

  const url = "http://localhost:3010/api/v0/auth/validJwt";

  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  //console.log(response);
});
