module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define(
		"Task",
		{
			title: {
				type: DataTypes.STRING(150),
				allowNull: false,
			},
			taskDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			isFinished: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			underscored: true,
			charset: "utf8",
			collate: "utf8_general_ci",
		},
	);

	Task.associate = (db) => {
		db.Task.belongsTo(db.Topic);
	};

	return Task;
};
