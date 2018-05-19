import * as firebase from "firebase";

export default {
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_EXPERIENCE(state, payload) {
      let experience = state.user.experience + payload;
      state.user.experience = experience;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    experience(state) {
      return state.user.experience;
    }
  },
  actions: {
    logout({ commit }) {
      firebase.auth().signOut();
    },
    fetchUser({ commit, state, dispatch }, payload) {
      //console.log("Fetch user's data");
      commit("SET_LOADING", true);
      firebase
        .database()
        .ref("/users/" + payload.uid)
        .once("value")
        .then(user => {
          commit("SET_USER", user.val());
          dispatch("fetchTeam", user.val());
          dispatch("updateTeam");
        });
    },
    facebookSignup({ state, commit, getters }, teamId) {
      console.log(teamId);
      commit("SET_LOADING", true);
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var facebookUser = result.user;
          // ...
          console.log(result.user);
          commit("SET_LOADING", false);
          let user = {};
          if (teamId != false) {
            user = {
              uid: facebookUser.uid,
              displayName: facebookUser.displayName,
              email: facebookUser.email,
              photoURL: facebookUser.photoURL,
              experience: 0,
              team: teamId,
              addedToHomescreen: false
            };
          } else {
            user = {
              uid: facebookUser.uid,
              displayName: facebookUser.displayName,
              email: facebookUser.email,
              photoURL: facebookUser.photoURL,
              experience: 0,
              team: facebookUser.uid,
              addedToHomescreen: false
            };
          }
          commit("SET_USER", user);
          firebase
            .database()
            .ref("users/" + facebookUser.uid)
            .update(user)
            .catch(error => {
              console.log(error);
            });
          //let teamMates = {teamMates:user};
          if (teamId != false) {
            firebase
              .database()
              .ref("teams/" + teamId + "/" + facebookUser.uid)
              .update(user)
              .catch(error => {
                console.log(error);
              });
          } else {
            firebase
              .database()
              .ref("teams/" + facebookUser.uid + "/" + facebookUser.uid)
              .update(user)
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          error => {
            commit("SET_LOADING", false);
            console.log(error);
          };
        });
    }
  }
};
