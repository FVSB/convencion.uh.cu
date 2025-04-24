import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';

// Atributos del modelo
interface SponsorAttributes {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
}

// Para creación: id y createdAt se generan automáticamente
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
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    image: {
      type: new DataTypes.STRING(255),
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
