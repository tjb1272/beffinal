module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define('Post', {
        title: DataTypes.STRING
    });

    Post.associate = (models) => {
        models.Post.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};
