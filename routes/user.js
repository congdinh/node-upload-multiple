var sess;
var account = {
  name: 'anyone',
  password: 'anyone@git#'
}
var user = {
  login: function(req, res) {
    sess = req.session;
    if (req.body.user_name == null || req.body.password == null) {
      res.render('index', {
        message: "Required Params Are Missing"
      });
    }
    if (req.body.user_name === account.name && req.body.password === account.password) {
      sess.USER = req.body.user_name;
      res.redirect('/dashboard');
    } else {
      res.render('index', {
        message: "No User Found"
      });
    }
  }
};
module.exports = user;
