export const setResponseListSuccess = (state, cidades) => {
    state.cidades = cidades;
  };
  
  export const setResponseSuccess = (state, cidade) => {
    state.cidade = cidade;
  };
  
  export const setData = (state, cidade) => {
    state.cidade = cidade;
  };
  
  export const setResponseError = (state, error) => {
    state.dataError = error;
  };
  
  export const setOptions = (state, options) => {
    state.options = options;
  };
  