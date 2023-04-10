import { projectConstants } from "../../shared/constants";
import { projectService } from "../services";
import { alertActions } from "./";

export const projectActions = {
  get,
  getByUserIdAndFolderId,
  create,
  update,
  remove,
};

function get() {
  return (dispatch) => {
    dispatch(request());

    projectService.get().then(
      (response) => {
        if (response.success) {
          let projects = response.projects;
          dispatch(success(projects));
        } else {
          let error = response.message;
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: projectConstants.GET_REQUEST };
  }
  function success(projects) {
    return { type: projectConstants.GET_SUCCESS, projects };
  }
  function failure(error) {
    return { type: projectConstants.GET_FAILURE, error };
  }
}

function getByUserIdAndFolderId(userId, folderId) {
  return (dispatch) => {
    dispatch(request(userId, folderId));

    projectService.getByUserIdAndFolderId(userId, folderId).then(
      (response) => {
        if (response.success) {
          let projects = response.projects;
          console.log(projects, "--------res------------");
          dispatch(success(projects));
        } else {
          let error = response.message;
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(userId, folderId) {
    return {
      type: projectConstants.GET_BY_USERID_AND_FOLDERID_REQUEST,
      userId,
      folderId,
    };
  }
  function success(projects) {
    return {
      type: projectConstants.GET_BY_USERID_AND_FOLDERID_SUCCESS,
      projects,
    };
  }
  function failure(error) {
    return { type: projectConstants.GET_BY_USERID_AND_FOLDERID_FAILURE, error };
  }
}

function create(folder) {
  return (dispatch) => {
    dispatch(request(folder));

    projectService.create(folder).then(
      (response) => {
        if (response.success) {
          let folder = response.folder;
          dispatch(success(folder));
          dispatch(alertActions.success(response.message));
        } else {
          let error = response.message;
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(folder) {
    return { type: projectConstants.CREATE_REQUEST, folder };
  }
  function success(folder) {
    return { type: projectConstants.CREATE_SUCCESS, folder };
  }
  function failure(error) {
    return { type: projectConstants.CREATE_FAILURE, error };
  }
}

function update(folder) {
  return (dispatch) => {
    dispatch(request(folder));

    projectService.update(folder).then(
      (response) => {
        if (response.success) {
          let folder = response.folder;
          dispatch(success(folder));
          dispatch(alertActions.success(response.message));
        } else {
          let error = response.message;
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(folder) {
    return { type: projectConstants.UPDATE_REQUEST, folder };
  }
  function success(folder) {
    return { type: projectConstants.UPDATE_SUCCESS, folder };
  }
  function failure(error) {
    return { type: projectConstants.UPDATE_FAILURE, error };
  }
}

function remove(id) {
  return (dispatch) => {
    dispatch(request(id));

    projectService.remove(id).then(
      (response) => {
        if (response.success) {
          dispatch(success(id));
          dispatch(alertActions.success(response.message));
        } else {
          let error = response.message;
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: projectConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: projectConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: projectConstants.DELETE_FAILURE, error };
  }
}
