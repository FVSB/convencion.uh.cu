import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../db';

interface SponsorAttributes {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
}

interface SponsorCreationAttributes extends Optional<SponsorAttributes, 'id' | 'createdAt'> {}

class Sponsor extends Model<SponsorAttributes, SponsorCreationAttributes>
  implements SponsorAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public createdAt!: Date;
}

Sponsor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'sponsors',
    sequelize,
    updatedAt: false
  }
);

export default Sponsor;
