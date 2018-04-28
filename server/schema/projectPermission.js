/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  console.log('projectPermission Table');
  return sequelize.define('projectPermission', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    write: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
    },
    setting: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
    },
  }, {
    tableName: 'projectPermission',
  });
};
