"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserContact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
            this.belongsTo(models.Contact, { foreignKey: "contactId", as: "contact" });
           
        }
    }
    UserContact.init(
        {
            mode: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            contactId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "UserContact",
        }
    );
    return UserContact;
};
