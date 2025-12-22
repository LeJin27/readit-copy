import { expect, test } from "vitest";
import { AuthService } from "../service/auth/service";
import { CommunityService } from "../service/community/service";

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

test("User can get all communities given cookie", async () => {
  const user = await new AuthService().login({
    email: "molly@books.com",
    password: "mollymember",
  });
  const cookie = user?.accessToken;
  const results = await new CommunityService().getAll(cookie);
  console.log(results[0]);
});
test("User can get community by given id", async () => {
  const user = await new AuthService().login({
    email: "molly@books.com",
    password: "mollymember",
  });
  const cookie = user?.accessToken;
  const results = await new CommunityService().getAll(cookie);
  const id = results[0].id;

  const results2 = await new CommunityService().getById(id, cookie);
  console.log(results2);
  expect(results2).toBeDefined();
});

test("User can create new community", async () => {
  const user = await new AuthService().login({
    email: "molly@books.com",
    password: "mollymember",
  });
  const cookie = user?.accessToken;
  const results = await new CommunityService().create(
    { name: "poggg", description: "s", privacy: "private" },
    cookie,
  );
  console.log(results);
});
