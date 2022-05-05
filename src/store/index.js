import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/services/api";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playgrounds: [],
    playground: null,
    user: {},
    login: false,
    loginEr: "",
  },
  getters: {
  },
  mutations: {
    SET_PLAYGROUNDS(state, playgrounds) {
      state.playgrounds = playgrounds;
    },
    SET_PLAYGROUND(state, playground) {
      state.playground = playground;
    },
    LOGIN(state, resp) {
      // localStorage.setItem("token", resp.access_token);
      state.login = true;
      console.log(resp)
    },
    REGISTER(state, resp) {
      console.log(resp);
    },
  },
  actions: {
    async getPlaygrounds({ commit }) {
      return await api.get("https://keloyna.herokuapp.com/v1/api/playground/list").then((res) => {
        commit("SET_PLAYGROUNDS", res.data);
        return res.data;

      });
    },
    async getPlayground({ commit }, playgroundId) {
      return await api.get(`https://keloyna.herokuapp.com/v1/api/playground/${playgroundId}`).then((res) => {
        console.log(res.data)
        commit("SET_PLAYGROUND", res.data);
        return res.data;
      });
    },
    loginUser({ commit }, user) {
      api
          .post("https://keloyna.herokuapp.com/v1/api/login", {
            phone: user.phone,
            password: user.password,
          })
          .then((response) => {
            commit("LOGIN", response.data.data);
            console.log("Log in!");
          })
          .catch((error) => {
            console.log("Password or Phone number incorrect!\n");
            console.log("");
            console.log(error);
            this.state.loginEr = "Неправильный пароль !";
          });
    },
    registerUser({ commit }, user) {
      api
          .post("https://keloyna.herokuapp.com/v1/api/register", {
            email: user.phone,
            password: user.password,
          })
          .then((response) => {
            commit("REGISTER", response.data);
          });
    },
  },
  modules: {
  }
})
