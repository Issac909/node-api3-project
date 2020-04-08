const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

  // This is what will be translated to our backend from our client requests

function get() {
  // Returning all the info on our 'posts' table
  return db('posts');
}

function getById(id) {
  // Essentially, were setting up SQL Statements like we practiced here https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top
  // The difference is were using Knex, which is Node.js interpretor that translates our JavaScript, so our database understands
  // Knex library https://knexjs.org/ 
  return db('posts')
    .where({ id })
    .first();
}

function insert(post) {
  return db('posts')
  // Because what we are sending to the server is a promise, we have acces to '.then'
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  // This is going to update our 'posts' table, which has an 'id' and object, so:
  // { id: 1, user: changes}
  // We elaborate on what data 'changes' is recieving based on conditions set in our router
  return db('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
