module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		text: DataTypes.STRING,
		description: DataTypes.TEXT,
		userName: DataTypes.STRING, 
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		imgUrl: DataTypes.STRING
	});
	return User;
};
