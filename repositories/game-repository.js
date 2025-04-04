const { Op } = require('sequelize');
const { Game } = require('../models');

module.exports = {
  findAll() {
    return Game.findAll();
  },

  create(gameData) {
    return Game.create(gameData);
  },

  delete(id) {
    return Game.findByPk(id).then((game) => game.destroy({ force: true }));
  },

  update(id, gameData) {
    return Game.findByPk(id).then((game) => game.update(gameData));
  },

  search(name, platform) {
    return Game.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        platform: {
          [Op.like]: `%${platform}%`,
        },
      },
      raw: true,
    })
      .then((games) => {
        console.log('Jeux trouvés:', games);
        if (games.length === 0) {
          console.log('Aucun jeu trouvé');
          return [];
        }
        return games;
      })
      .catch((err) => {
        console.log('Erreur lors de la recherche:', err);
      });
  },

  deleteAll() {
    return Game.destroy({ where: {}, truncate: true });
  },

  bulkCreate(games) {
    return Game.bulkCreate(games);
  },
};
