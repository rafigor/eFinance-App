export const setResponseListSuccess = (state, clientes) => {
    state.clientes = clientes;
  };
  
  export const setResponseSuccess = (state, cliente) => {
    state.cliente = cliente;
  };
  
  export const setData = (state, cliente) => {
    state.cliente = cliente;
  };
  
  export const setResponseError = (state, error) => {
    state.dataError = error;
  };
  
  export const setOptions = (state, options) => {
    state.options = options;
  };
  