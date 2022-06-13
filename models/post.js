const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      content : {
        type : Sequelize.TEXT,
        allowNull: true,
      },
      img : {
        type: Sequelize.STRING(100),
        allowNUll: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
  }
};