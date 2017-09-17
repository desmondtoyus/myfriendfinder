let friends= require('../data/friends');
let user =[];
module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    })
    
app.post('/api/friends', function (req, res) {
  user.push(req.body);
   res.json(true);

})
}