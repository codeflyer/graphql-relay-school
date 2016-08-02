const usersData = require('./../data/users.json')
  .map(
    (user, index) =>
      Object.assign(
        {},
        user,
        { id: index, like: Math.floor((Math.random() * 10) + 1) }
      )
  );

export default usersData;
