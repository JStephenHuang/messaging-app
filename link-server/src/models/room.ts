import {
  Sequelize,
  Model,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  CreationOptional,
} from "sequelize";
import { User } from "./user";
import { Message } from "./message";

class Room extends Model {
  declare id: CreationOptional<number>;
  declare uuid: string;
  declare name: string;
  declare owner: string;

  declare Users: User[];
  declare addUser: BelongsToManyAddAssociationMixin<User, number>;
  declare removeUser: BelongsToManyRemoveAssociationMixin<User, number>;

  declare Messages: Message[];
  declare addMessage: BelongsToManyAddAssociationMixin<Message, number>;
}

const initializeRoomModel = (sequelize: Sequelize) => {
  return Room.init(
    {
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize }
  );
};

export { initializeRoomModel, Room };
