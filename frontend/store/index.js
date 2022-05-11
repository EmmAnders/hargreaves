export const state = () => ({
  imageUrl: "https://artbyhargreaves.herokuapp.com",
  apiUrl: process.env.BASE_URL,
  artPieces: [],
  about: [],
  wishlist: [],
  isWishlist: false,
  isFilter: false,
  selectedFilter: [],
  isMobileNavigation: false,
});

export const getters = {
  selectedFilterLength: (state) => {
    return state.selectedFilter.length;
  },

  wishlistLength: (state) => {
    return state.wishlist.length;
  },
};

export const mutations = {
  SET_MOBILE_NAV(state) {
    state.isMobileNavigation = !state.isMobileNavigation;
  },

  SET_ART_PIECES(state, payload) {
    state.artPieces = payload;
  },

  SET_ABOUT_PAGE(state, payload) {
    state.about = payload;
  },

  SET_FILTER(state) {
    state.isFilter = !state.isFilter;
  },

  SET_SELECTEDFILTER(state, payload) {
    let index = state.selectedFilter.indexOf(payload);
    if (state.selectedFilter.includes(payload)) {
      state.selectedFilter.splice(index, 1);
    } else {
      state.selectedFilter.push(payload);
    }
  },

  CLEAR_FILTER(state) {
    state.selectedFilter = [];
  },

  SET_WISHLIST(state, payload) {
    state.wishlist = payload;
  },

  SAVE_WISHLIST(state, payload) {
    state.wishlist.push(payload);
    window.localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  },

  UPDATE_WISHLIST(state, payload) {
    let index = state.wishlist.indexOf(payload);
    state.wishlist.splice(index, 1);
    window.localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  },

  SET_TOGGLE_WISHLIST(state) {
    state.isWishlist = !state.isWishlist;
  },
};

export const actions = {
  toggleFilter({ commit }) {
    commit("SET_FILTER");
  },

  toggleMobileNav({ commit }) {
    commit("SET_MOBILE_NAV");
  },

  async getAllPieces({ commit, state }) {
    try {
      const res = await this.$axios.$get(`/images?populate=*`);
      commit("SET_ART_PIECES", res.data);
    } catch (error) {
      console.log("errore", error);
    }
  },

  async getAboutInfo({ commit, state }) {
    try {
      const res = await this.$axios.$get(`/about?populate=*`);
      commit("SET_ABOUT_PAGE", res.data);
    } catch (error) {
      console.log("errorr", error);
    }
  },

  addWishlistItem({ commit, dispatch, state }, payload) {
    let found = state.wishlist.find(
      (item) => item.attributes.slug == payload.attributes.slug
    );
    if (found) {
      return;
    } else {
      commit("SAVE_WISHLIST", payload);
      dispatch("toggleWishlist");
    }
  },

  removeWishlistItem({ commit }, payload) {
    commit("UPDATE_WISHLIST", payload);
  },

  toggleWishlist({ commit }) {
    commit("SET_TOGGLE_WISHLIST");
  },

  async fetchWishlist({ commit, state }) {
    let localStorageItems = JSON.parse(localStorage.getItem("wishlist"));
    const promises = [];

    localStorageItems.map((item) => {
      const result = this.$axios.$get(
        `/images?filters[slug][$eq]=${item.attributes.slug}&populate=*`
      );
      promises.push(result);
    });

    const results = await Promise.all(promises);
    let data = results.map((result) => result.data);
    commit("SET_WISHLIST", data.flat());
    return;
  },
};
