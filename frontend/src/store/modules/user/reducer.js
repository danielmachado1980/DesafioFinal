import produce from 'immer';
import { AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT } from '../auth/actions';
import { USER_UPDATE_PROFILE_SUCCESS } from './actions';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AUTH_SIGN_IN_SUCCESS:
        draft.profile = action.payload.user;
        break;
      case USER_UPDATE_PROFILE_SUCCESS:
        draft.profile = action.payload;
        break;
      case AUTH_SIGN_OUT:
        draft.profile = null;
        break;
      default:
        break;
    }
  });
}
