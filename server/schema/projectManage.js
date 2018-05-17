/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  console.log('projectManage Table');
  return sequelize.define('projectManage', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    project_name: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    creator: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    descr: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
  }, {
    tableName: 'projectManage',
  });
};
