let friends= require('../data/friends');
let user =[];
module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    })
    
app.post('/api/friends', function (req, res) {
  friends.push(req.body);
  console.log(friends);
   res.json(true);

})
}