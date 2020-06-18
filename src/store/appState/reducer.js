import { SET_GLOBAL_GAME_STATE } from './actions';

const initialState = {
  globalGameState: "passive",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_GAME_STATE:
      return { ...state, globalGameState: action.payload };

    default:
      return state;
  }
};
