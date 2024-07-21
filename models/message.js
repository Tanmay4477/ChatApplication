module.exports = (sequelize, DataTypes) => {

    return sequelize.define("Message", {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
};