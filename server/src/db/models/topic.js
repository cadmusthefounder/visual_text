module.exports = (sequelize, DataTypes) => {
  const topic = sequelize.define('topic', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photo: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    }
  }, {
    underscored: true
  });

  topic.associate = (models) => {
    topic.hasMany(models.question, { onDelete: 'cascade', hooks: true  });
  }
  return topic;
}