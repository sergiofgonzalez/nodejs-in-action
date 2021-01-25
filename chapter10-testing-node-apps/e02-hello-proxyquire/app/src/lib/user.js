const users = {
  111: {
    id: 111,
    name: 'Jason Isaacs',
    email: 'jason.isaacs@oa.com',
    age: 54
  },
  112: {
    id: 112,
    name: 'Idris Elba',
    email: 'idris.elba@wire.com',
    age: 45
  }
};


module.exports = {
  findOne(query, done) {
    // this would be accessing the db in the real world
    setTimeout(() => {
      if (query.id in users) {
        return done(null, users[query.id]);
      }
      return done('user not found');
    }, 2000);
  }
};