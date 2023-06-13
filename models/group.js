"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Contact, {
                foreignKey: "groupId",
                as: "contacts",
            });
        }
    }
    Group.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Group",
        }
    );
    return Group;
};
