export default {
  state: {
    snackbar: {
      activated: false,
      text: ""
    },
    hidden: false
  },
  mutations: {
    SET_SNACKBAR(state, payload) {
      state.snackbar = { activated: true, text: payload };
    },
    SET_HIDDEN(state, payload) {
      state.hidden = payload;
    }
  },
  actions: {
    hideSnackbarForSecondes({ commit }) {
      commit("SET_HIDDEN", true);
      setTimeout(function() {
        commit("SET_HIDDEN", false);
      }, 5000);
    }
  },
  getters: {
    snackbar(state) {
      return state.snackbar;
    },
    hidden(state) {
      return state.hidden;
    }
  }
};
