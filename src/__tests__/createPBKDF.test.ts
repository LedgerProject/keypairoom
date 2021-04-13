import { createPBKDF } from "../serverSide";
test("createPBKDF : pass Andrea userData", async () => {
  const userData = {
    username: "JohnDoe",
    email: "john@doe.com",
    phone: "12345678",
  };

  const data = await createPBKDF(userData);

  expect(data).toStrictEqual({
    key_derivation:
      "IF+tlV3TquNpuXVheRz8vKwkD567Nf9YzrI/AIi5Yr0gX62VXdOq42m5dWF5HPw=",
  });
});

test("createPBKDF : pass only email in userData", async () => {
  const userData = {
    email: "john@doe.com",
  };

  const data = await createPBKDF(userData);

  expect(data).toStrictEqual({
    key_derivation: "fRODgLOSb2+VMeB3k3IDbGNZxQ==",
  });
});
