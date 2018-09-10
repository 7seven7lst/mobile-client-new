import axios from 'axios';
import constants from './constants';

const SERVER_BASE_URL = 'http://localhost:3001';

// Action Creators
export function authenticate(email, password) {
  return (dispatch, getState) => {
    dispatch(startAuthentication())
    return axios({
      url: `${SERVER_BASE_URL}/api/v1/auth/sign_in`,
      method: 'POST',
      data: { email, password }
    }).then(response => {
      const uid = response.headers['uid']
      const client = response.headers['client']
      const accessToken = response.headers['access-token']
      const expiry = response.headers['expiry']
      dispatch(successAuthentication(uid, client, accessToken, expiry))
    }).catch(error => {
      dispatch(failAuthentication())
    })
  }
}

export function signout() {
  return (dispatch, getState) => {
    const { auth } = getState()
    return axios({
      url: `${SERVER_BASE_URL}/api/v1/auth/sign_out`,
      method: 'DELETE',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid
      }
    }).then(response => {
      dispatch(doSignout())
    }).catch(error => {
      console.log(error)
    })
  }
}

export function expireAuthentication() {
  return doSignout();
}

function startAuthentication() {
  return { type: constants.AUTH_REQUEST };
}

function successAuthentication(uid, client, accessToken, expiry) {
  return { type: constants.AUTH_RECEIVED, uid, client, accessToken, expiry };
}

function failAuthentication() {
  return { type: constants.AUTH_FAILED };
}

function doSignout() {
  return { type: constants.AUTH_SIGNOUT };
}
