const gameService = require('../services/game-service');

module.exports = {
  getGames(req, res) {
    gameService
      .getAllGames()
      .then((games) => res.send(games))
      .catch((err) => {
        console.log('There was an error querying games', JSON.stringify(err));
        return res.status(400).send(err);
      });
  },

  createGame(req, res) {
    const {
      publisherId,
      name,
      platform,
      storeId,
      bundleId,
      appVersion,
      isPublished,
    } = req.body;
    gameService
      .createGame({
        publisherId,
        name,
        platform,
        storeId,
        bundleId,
        appVersion,
        isPublished,
      })
      .then((game) => res.send(game))
      .catch((err) => {
        console.log(
          '***There was an error creating a game',
          JSON.stringify(err),
        );
        return res.status(400).send(err);
      });
  },

  deleteGame(req, res) {
    const id = parseInt(req.params.id);
    gameService
      .deleteGame(id)
      .then(() => res.send({ id }))
      .catch((err) => {
        console.log('***Error deleting game', JSON.stringify(err));
        res.status(400).send(err);
      });
  },

  updateGame(req, res) {
    const id = parseInt(req.params.id);
    const {
      publisherId,
      name,
      platform,
      storeId,
      bundleId,
      appVersion,
      isPublished,
    } = req.body;
    gameService
      .updateGame(id, {
        publisherId,
        name,
        platform,
        storeId,
        bundleId,
        appVersion,
        isPublished,
      })
      .then((game) => res.send(game))
      .catch((err) => {
        console.log('***Error updating game', JSON.stringify(err));
        res.status(400).send(err);
      });
  },

  searchGames(req, res) {
    const { name, platform } = req.body;
    gameService
      .searchGames(name, platform)
      .then((games) => res.send(games))
      .catch((err) => {
        console.log('***Error searching games', JSON.stringify(err));
        res.status(400).send(err);
      });
  },

  populateGames(req, res) {
    const { bucketUrls } = req.body;
    gameService
      .populateGames(bucketUrls)
      .then(() => res.send({ message: 'Games populated successfully' }))
      .catch((err) => {
        console.log('***Error populating games', JSON.stringify(err));
        res.status(400).send(err);
      });
  },
};
