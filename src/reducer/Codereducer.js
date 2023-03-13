export const initialState = {};

export const code_reducer = (state = initialState, action) => {
  if (action.type === "RESET") {
    return initialState;
  } else if (action.type === "SET_IMAGE_DATA") {
    return { ...state, pictureData: action.payload };
  }
  return state;
};
