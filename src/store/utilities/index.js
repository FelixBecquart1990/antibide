import * as firebase from "firebase";

export default {
  state: {
    loading: false,
    dialogVideo: false,
    timer: 0,
    dialogTimer:false,
    addToHomescreen:null
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_DIALOG_VIDEO(state, payload) {
      state.dialogVideo = payload;
    },
    SET_DIALOG_TIMER(state, payload) {
      state.dialogTimer = payload;
    },
    SET_TIMER(state, payload) {
      state.timer = payload;
    },
    SET_ADD_TO_HOMESCREEN(state, payload) {
      state.addToHomescreen = payload;
    }
  },
  actions: {
    addToHomescreen({ commit, getters, state, dispatch }, payload) {
      //console.log("Update user's data");
      let data = { addedToHomescreen: true };
      firebase
        .database()
        .ref("/users/" + getters.user.uid)
        .update(data);
    },
    updateVersion({ commit, getters, state, dispatch }, payload) {
      //console.log("Update user's data");
      firebase
        .database()
        .ref("/version/")
        .on("child_changed", team => {
          /*caches.delete()
          localStorage.clear();
          location.reload(true)*/
        });
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    dialogVideo(state) {
      return state.dialogVideo;
    },
    dialogTimer(state) {
      return state.dialogTimer;
    },
    timer(state) {
      return state.timer;
    },
    addToHomescreen(state) {
      return state.addToHomescreen;
    }
  }
};
