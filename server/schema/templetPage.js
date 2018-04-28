/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  console.log('templetPage Table');
  return sequelize.define('templetPage', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    templet_name: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    creator: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    descr: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    selectEffect: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1',
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'templetPage',
  });
};
