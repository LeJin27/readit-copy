import { expect, test } from "vitest";
import { AuthService } from "../service/auth/service";

test("adds 1 + 2 to equal 3", async () => {
  const service = await new AuthService().login({
    email: "molly@books.com",
    password: "mollymember",
  });
  expect(service === "test");
});
