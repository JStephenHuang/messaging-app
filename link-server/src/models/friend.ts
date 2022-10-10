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

class Friend extends Model {
  declare id: CreationOptional<number>;
  declare tag: string;
  declare user1: string;
  declare user2: string;
  declare uuid: string;

  declare Users: User[];
  declare addUser: BelongsToManyAddAssociationMixin<User, number>;
  declare removeUser: BelongsToManyRemoveAssociationMixin<User, number>;

  declare Messages: Message[];
  declare addMessage: BelongsToManyAddAssociationMixin<Message, number>;
}

const initializeFriendModel = (sequelize: Sequelize) => {
  return Friend.init(
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize }
  );
};

export { initializeFriendModel, Friend };
