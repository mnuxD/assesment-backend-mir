import axios from "axios";

describe("List tests", () => {
  let token;

  beforeAll(async () => {
    //login to get token
    const login = await axios.post("http://localhost:5000/auth/local/login", {
      email: "test@test.com",
      password: "Abc1234*",
    });
    const { token: tokenUser } = login.data;
    token = tokenUser;
  });

  it("should create a list to user", async () => {
    const list = await axios.post(
      "http://localhost:5000/api/favs",
      {
        name: "Lista del usuario 3",
        userID: "6262dde086fb56e0c9d89255",
        list: [
          {
            title: "Motos",
            description: "Lista de motos favoritas",
            link: "www.motos.com",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(list.status).toEqual(201);
  });

  it("missing data", async () => {
    const list = await axios
      .post(
        "http://localhost:5000/api/favs",
        {
          userID: "6262dde086fb56e0c9d89255",
          list: [
            {
              title: "Motos",
              description: "Lista de motos favoritas",
              link: "www.motos.com",
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Should get all lists", async () => {
    const lists = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(lists.status).toEqual(200);
  });

  it("Should get list of user", async () => {
    const list = await axios.get(
      "http://localhost:5000/api/favs/user/6262ce18518c6a5c915685d6",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(list.status).toEqual(200);
  });

  it("Shouldn't fetch a list of a non-existent user", async () => {
    const list = await axios
      .get("http://localhost:5000/api/favs/user/6262ce18518c6a5c915", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Should get list by id", async () => {
    const list = await axios.get(
      "http://localhost:5000/api/favs/6262da79069e0f7814aea34c",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(list.status).toEqual(200);
  });

  it("Shouldn't fetch a nonexistent list", async () => {
    const list = await axios
      .get("http://localhost:5000/api/favs/6262da79069e0f7814", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Should delete one list", async () => {
    const deletedList = await axios.delete(
      "http://localhost:5000/api/favs/6262da79069e0f7814aea34c",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(deletedList.status).toEqual(200);
  });

  it("Shouldn't delete a non-existing list", async () => {
    const deletedList = await axios
      .delete("http://localhost:5000/api/favs/6262da79069e0f7814ae", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Should add items to list", async () => {
    const listToUpdate = await axios.put(
      "http://localhost:5000/api/favs/additems/6262dedc633962db98384fb4",
      [
        {
          title: "Jarrones",
          description: "Lista de jarrones favoritos",
          link: "www.jarrones.com",
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(listToUpdate.status).toEqual(200);
  });

  it("Shouldn't add an incomplete item", async () => {
    const listToUpdate = await axios
      .put(
        "http://localhost:5000/api/favs/additems/6262dedc633962db98384fb4",
        [
          {
            description: "Lista de jarrones favoritos",
            link: "www.jarrones.com",
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });

  it("Shouldn't add an item to a non-existing list", async () => {
    const listToUpdate = await axios
      .put(
        "http://localhost:5000/api/favs/additems/6262dedc633962db9",
        [
          {
            title: "Jarrones",
            description: "Lista de jarrones favoritos",
            link: "www.jarrones.com",
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        const status = e.response.status;
        expect(status).toEqual(500);
      });
  });
});
