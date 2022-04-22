import axios from "axios";

describe("User tests", () => {
  it("should register user", async () => {
    const user = {
      email: "test2@test.com",
      password: "Abc1234*",
    };
    const result = await axios.post(
      "http://localhost:5000/auth/local/register",
      user
    );
    expect(result.data).toBeDefined();
    expect(result.data.email).toEqual("test2@test.com");
  });
  it.only("should login user", async () => {
    const login = await axios.post("http://localhost:5000/auth/local/login", {
      email: "test@test.com",
      password: "Abc1234*",
    });
    expect(login.data.token).toBeDefined();
  });
  it("should get all users", async () => {
    const login = await axios.post("http://localhost:5000/auth/local/login", {
      email: "test@test.com",
      password: "Abc1234*",
    });
    const users = await axios.get("http://localhost:5000/auth/local/users", {
      headers: {
        Authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(users.status).toEqual(200);
  });
});
