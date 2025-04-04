const express = require('express');
const bodyParser = require('body-parser');
const gameController = require('./controllers/game-controller');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/static`));

app.get('/api/games', gameController.getGames);
app.post('/api/games', gameController.createGame);
app.delete('/api/games/:id', gameController.deleteGame);
app.put('/api/games/:id', gameController.updateGame);
app.post('/api/games/search', gameController.searchGames);
app.post('/api/games/populate', gameController.populateGames);

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = app;
