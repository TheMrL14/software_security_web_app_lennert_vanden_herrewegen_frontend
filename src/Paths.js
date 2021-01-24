const INDEX = process.env.REACT_APP_API_PATH;
const MOVIES = INDEX + "/reviews";
const USERS = INDEX + "/users";
const CHECKCOUNT = USERS + "/count";

module.exports = {
  INDEX: INDEX,
  MOVIES: MOVIES,
  USER: USERS,
  CHECKCOUNT: CHECKCOUNT,
};
