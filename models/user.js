module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
		},
		{
			charset: "utf8",
			collate: "utf8_general_ci",
		},
	);

	User.associate = (db) => {
		db.User.hasMany(db.Topic);
	};

	return User;
};
