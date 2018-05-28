module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { 
    underscored: true 
  });

  question.associate = (models) => {
    question.hasMany(models.option, { onDelete: 'CASCADE' });
    question.belongsTo(models.option, { as: 'correct_answer', constraints: false });
  }
  return question;
}