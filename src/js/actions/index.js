// TYPE
const TYPE = {
  SET_TOKEN: "project/SET_TOKEN",
};

// SELECTOR
const select = {
  project: {
    selectToken: (state) => state?.project?.token,
  }
};

// ACTIONS
export { TYPE, select };

const actions = {
  project: {
    setToken: (token) => ({
      type: TYPE.SET_TOKEN,
      payload: token,
    }),
  },
};

export default actions;
