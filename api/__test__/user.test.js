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

  it("Email already exists", async () => {
    const result = await axios
      .post("http://localhost:5000/auth/local/register", {
        email: "test2@test.com",
        password: "Abc1234*",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Password very short", async () => {
    const result = await axios
      .post("http://localhost:5000/auth/local/register", {
        email: "test20@test.com",
        password: "12345",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("should get all users", async () => {
    const users = await axios.get("http://localhost:5000/auth/local/users", {
      headers: {
        Authorization: `Bearer ${login.data.token}`,
      },
    });
    expect(users.status).toEqual(200);
  });
});
