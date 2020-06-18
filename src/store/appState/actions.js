export const SET_GLOBAL_GAME_STATE = "SET_GLOBAL_GAME_STATE";

export const setGlobalGameState = (gameState) => {
  return {
    type: SET_GLOBAL_GAME_STATE,
    payload: gameState,
  };
};
