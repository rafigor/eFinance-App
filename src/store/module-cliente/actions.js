import Vue from 'vue';

export const list = (state) => {
  console.log('Action List...');

  const options = {
    method: 'get',
    url   : '/api/v1/clientes',
  };

  return Vue.prototype.$axios(options).then((response) => {
    state.commit('setResponseListSuccess', response.data);
    return Promise.resolve();
  }).catch((err) => {
    state.commit('setResponseError', err.response);
    return Promise.reject();
  });
};

export const show = (state, id) => {
  console.log('Action Show...');

  const options = {
    method: 'get',
    url   : `/api/v1/clientes/${id}`,
  };

  return Vue.prototype.$axios(options).then((response) => {
    state.commit('setResponseSuccess', { data: response.data });
    return Promise.resolve();
  }).catch((err) => {
    state.commit('setResponseError', err.response);
    return Promise.reject();
  });
};

export const insert = (state) => {
  console.log('Action Insert...');

  const options = {
    method: 'post',
    url   : '/api/v1/clientes',
    data  : state.getters.byId,
  };

  return Vue.prototype.$axios(options).then((response) => Promise.resolve()).catch((err) => {
    state.commit('setResponseError', err.response);
    return Promise.reject();
  });
};

export const edit = (state) => {
  console.log('Action Edit...');

  const options = {
    method: 'put',
    url   : `/api/v1/clientes/${state.getters.byId.id}`,
    data  : state.getters.byId,
  };

  return Vue.prototype.$axios(options).then((response) => Promise.resolve()).catch((err) => {
    state.commit('setResponseError', err.response);
    return Promise.reject();
  });
};

export const destroy = (state, id) => {
  console.log('Action Destroy...');

  const options = {
    method: 'delete',
    url   : `/api/v1/clientes/${id}`,
  };

  return Vue.prototype.$axios(options).then((response) => Promise.resolve()).catch((err) => {
    state.commit('setResponseError', err.response.data);
    return Promise.reject();
  });
};

export const listOptions = (state) => {
  console.log('Action listOptions...');

  return list(state).then(() => {
    const options = state.getters.list.map((item) => ({ label: item.nome, value: item.id }));
    state.commit('setOptions', options);
    return Promise.resolve();
  });
};
