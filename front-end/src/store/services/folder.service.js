import config from "config";
import { Redirect } from "react-router-dom";
export const folderService = {
  get,
  getByUserId,
  create,
  update,
  remove,
};

function get() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${config.apiUrl}/folders`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function getByUserId(userId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${config.apiUrl}/folders/${userId}`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function create(folders) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(folders),
  };

  return fetch(`${config.apiUrl}/folders/create`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function update(folders) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(folders),
  };

  return fetch(`${config.apiUrl}/folders/update`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function remove(id) {
  console.log(id);
  const requestOptions = {
    method: "POST",
    // mode: 'no-cors',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  };

  return fetch(`${config.apiUrl}/folders/remove`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
