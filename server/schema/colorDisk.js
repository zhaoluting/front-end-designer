/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('colorDisk', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    disk_name: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'colorDisk'
  });
};
