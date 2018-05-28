module.exports = (sequelize, DataTypes) => {
  const option = sequelize.define('option', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });

  option.belongsTo = (models) => {
    option.belongsTo(models.question, { onDelete: 'CASCADE' });
  }
  return option;
}