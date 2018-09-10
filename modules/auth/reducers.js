import _ from 'lodash';
import constants from './constants';

// initialState
const initialState = {
  loading: false,
  isAuthenticated: false,
  client: null,
  accessToken: null,
  uid: null,
  expiry: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case constants.AUTH_REQUEST:
      return _.assign(
        {},
        state,
        {
          loading: true,
        },
      );
    case constants.AUTH_RECEIVED:
      return _.assign(
        {},
        state,
        {
          loading: false,
          isAuthenticated: true,
          uid: action.uid,
          client: action.client,
          accessToken: action.accessToken,
          expiry: action.expiry
        },
      );
    case constants.AUTH_FAILED:
      return _.assign(
        {},
        state,
        {
          loading: false
        }
      );
    case constants.AUTH_SIGNOUT:
      return _.assign(
        {},
        initialState
      );
    default: return state;
  }
}
