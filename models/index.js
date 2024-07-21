const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("blocks", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});


const User = require("./user")(sequelize, DataTypes);

const Message = require("./message")(sequelize, DataTypes);


User.hasMany(Message);
Message.belongsTo(User);



sequelize.sync();

module.exports = { sequelize, User, Message };