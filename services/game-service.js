const gameRepository = require('../repositories/game-repository');

module.exports = {
  getAllGames() {
    return gameRepository.findAll();
  },

  createGame(gameData) {
    return gameRepository.create(gameData);
  },

  deleteGame(id) {
    return gameRepository.delete(id);
  },

  updateGame(id, gameData) {
    return gameRepository.update(id, gameData);
  },

  searchGames(name, platform) {
    return gameRepository.search(name, platform);
  },

  async populateGames(bucketUrls) {
    const fetchPromises = bucketUrls.map(async (url) => {
      const response = await fetch(url);
      return response.json();
    });

    const results = await Promise.all(fetchPromises);
    const games = results.flat(2);
    const formattedGames = games.map((game) => ({
      publisherId: game.publisher_id,
      name: game.name,
      platform: game.os,
      storeId: game.appId,
      bundleId: game.bundle_id,
      appVersion: game.version,
      isPublished: !!game.release_date,
    }));

    return gameRepository.bulkCreate(formattedGames);
  },
};
