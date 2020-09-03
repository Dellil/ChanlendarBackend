module.exports = (sequelize, DataTypes) => {
	const Topic = sequelize.define(
		"Topic",
		{
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			charset: "utf8",
			collate: "utf8_general_ci",
		},
	);

	Topic.associate = (db) => {
		db.Topic.belongsTo(db.User);
		db.Topic.hasMany(db.Task);
	};

	return Topic;
};
