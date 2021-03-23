const video = {
  state: {
    activeCollapseName: 0
  },

  mutations: {
    SET_ACTIVE_COLLAPSE_NAME: (state, data) => {
      state.activeCollapseName = data
    }
  }
}

export default video
