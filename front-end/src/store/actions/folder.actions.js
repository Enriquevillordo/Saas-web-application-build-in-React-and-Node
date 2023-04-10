import { folderConstants } from "../../shared/constants";
import { folderService } from "../../store/services";
import { alertActions } from "./";
import { history } from "../../shared/helpers";

export const folderActions = {
  get,
  getByUserId,
  create,
  update,
  remove,
};

function get() {
  return (dispatch) => {
    dispatch(request());

    folderService.get().then(
      (response) => {
        if (response.success) {
          let folders = response.folders;
          dispatch(success(folders));
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
    return { type: folderConstants.GET_REQUEST };
  }
  function success(folders) {
    return { type: folderConstants.GET_SUCCESS, folders };
  }
  function failure(error) {
    return { type: folderConstants.GET_FAILURE, error };
  }
}

function getByUserId(userId) {
  return (dispatch) => {
    dispatch(request(userId));

    folderService.getByUserId(userId).then(
      (response) => {
        if (response.success) {
          let folders = response.folders;
          dispatch(success(folders));
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

  function request(userId) {
    return { type: folderConstants.GET_REQUEST, userId };
  }
  function success(folders) {
    return { type: folderConstants.GET_SUCCESS, folders };
  }
  function failure(error) {
    return { type: folderConstants.GET_FAILURE, error };
  }
}

function create(folder) {
  return (dispatch) => {
    dispatch(request(folder));

    folderService.create(folder).then(
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
    return { type: folderConstants.CREATE_REQUEST, folder };
  }
  function success(folder) {
    return { type: folderConstants.CREATE_SUCCESS, folder };
  }
  function failure(error) {
    return { type: folderConstants.CREATE_FAILURE, error };
  }
}

function update(folder) {
  return (dispatch) => {
    dispatch(request(folder));

    folderService.update(folder).then(
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
    return { type: folderConstants.UPDATE_REQUEST, folder };
  }
  function success(folder) {
    return { type: folderConstants.UPDATE_SUCCESS, folder };
  }
  function failure(error) {
    return { type: folderConstants.UPDATE_FAILURE, error };
  }
}

function remove(id) {
  return (dispatch) => {
    dispatch(request(id));

    folderService.remove(id).then(
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
    return { type: folderConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: folderConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: folderConstants.DELETE_FAILURE, error };
  }
}
