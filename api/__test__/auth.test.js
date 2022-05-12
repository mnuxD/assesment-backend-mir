import axios from "axios";

describe("Auth tests", () => {
  it("should login user", async () => {
    const login = await axios.post("http://localhost:5000/auth/local/login", {
      email: "test@test.com",
      password: "Abc1234*",
    });
    expect(login.data.token).toBeDefined();
  });
  it("should not find the email", async () => {
    const login = await axios
      .post("http://localhost:5000/auth/local/login", {
        email: "test0@test.com",
        password: "Abc1234*",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(403);
      });
  });

  it("Invalid Password", async () => {
    const login = await axios
      .post("http://localhost:5000/auth/local/login", {
        email: "test@test.com",
        password: "1234567",
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(403);
      });
  });
});
