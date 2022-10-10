import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
} from "sequelize";
import { Room } from "../models/room";
import { Friend } from "./friend";
import { Message } from "../models/message";

class User extends Model {
  declare id: CreationOptional<number>;
  declare username: string;
  declare passwordSalt: string;
  declare passwordHash: string;

  declare Rooms: Room[];
  declare addRoom: BelongsToManyAddAssociationMixin<Room, number>;
  declare removeRoom: BelongsToManyRemoveAssociationMixin<Room, number>;

  declare Friends: Friend[];
  declare addFriend: BelongsToManyAddAssociationMixin<Friend, number>;
  declare removeFriend: BelongsToManyRemoveAssociationMixin<Friend, number>;

  declare Messages: Message[];
}

const initializeUserModel = (sequelize: Sequelize) => {
  return User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwordSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize }
  );
};

export { initializeUserModel, User };
