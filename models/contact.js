"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Group, {
                foreignKey: "groupId",
                as: "group",
            });
            this.hasMany(models.UserContact, { foreignKey: "contactId", as: "userContact" });
        }
    }
    Contact.init(
        {
            name: DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            groupId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Contact",
        }
    );
    return Contact;
};
