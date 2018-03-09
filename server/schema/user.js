/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  console.log('user Table');
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: '',
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false,
      defaultValue: '',
    },
    email: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    character: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
  }, {
    tableName: 'user',
  });
};
