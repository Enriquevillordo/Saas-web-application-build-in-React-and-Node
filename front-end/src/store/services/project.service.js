import config from "config";
import { Redirect } from "react-router-dom";
import { project } from "../reducers/project.reducer";
export const projectService = {
  get,
  getByUserIdAndFolderId,
  create,
  update,
  remove,
};

function get() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${config.apiUrl}/projects`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function getByUserIdAndFolderId(userId, folderId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, folderId }),
  };

  return fetch(`${config.apiUrl}/projects`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function create(projects) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projects),
  };
  console.log(projects);
  return fetch(`${config.apiUrl}/projects/create`, requestOptions)
  .then(handleResponse)
  .then((response) => {
      console.log(response,'projectssssssssssssss')
      if (response.success) {
        return response;
      } else {
        return response;
      }
    });
}

function update(projects) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projects),
  };

  return fetch(`${config.apiUrl}/projects/update`, requestOptions)
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

  return fetch(`${config.apiUrl}/projects/remove`, requestOptions)
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
