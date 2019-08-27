const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'wethotuwasatoad', (err, decodedToken) => {
      if (err) {
        // bad token
        res.status(401).json({message: 'wutdahek?'});
      } else { // decodedToken
        req.decodedJwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({message: 'no soup for you'});
  }

};









  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ran into an unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
