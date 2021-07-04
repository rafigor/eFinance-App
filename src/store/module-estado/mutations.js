export const setResponseListSuccess = (state, estados) => {
  state.estados = estados;
};

export const setResponseSuccess = (state, estado) => {
  state.estado = estado;
};

export const setData = (state, estado) => {
  state.estado = estado;
};

export const setResponseError = (state, error) => {
  state.dataError = error;
};

export const setOptions = (state, options) => {
  state.options = options;
};
