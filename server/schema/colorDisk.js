/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  console.log('colorDisk Table');
  return sequelize.define('colorDisk', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    disk_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: '',
    },
    disk_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
    },
    bcg_head: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    fc_head: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    bcg_left: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    fc_left: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    bcg_content: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    fc_content: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    bcg_right: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    fc_right: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    primary_color: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    hot_view: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
    },
  }, {
    tableName: 'colorDisk',
  });
};
