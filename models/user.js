const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        'User', {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            hooks: {
                beforeCreate: (User, options) => {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(User.password, salt);
                    User.password = hash;
                }
            }
        }
    );

    User.associate = (models) => {
        models.User.hasMany(models.Post);
    };

    return User;
};