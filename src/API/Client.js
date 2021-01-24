export default class Client {
  static getMethod = (PATH, callback) => {
    fetch(PATH, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        console.log("Error: ", response);
      })
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  static authenticatedGetMethod = (PATH, token, callback) => {
    fetch(PATH, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        console.log("Error: ", response);
      })
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  static deleteMethod = (PATH, token, callback) => {
    fetch(PATH, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) callback(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  static postMethod = (PATH, body, token, callback) => {
    fetch(PATH, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log("Create Error: ", error);
      });
  };

  static putMethod = (PATH, body, token, callback) => {
    fetch(PATH, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log("Create Error: ", error);
      });
  };
}
