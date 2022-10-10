import {
  Sequelize,
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
  CreationOptional,
} from "sequelize";
import { Message } from "./message";

class UserFriend extends Model {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare friendId: number;
  declare Messages: Message[];
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
  declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
}

const initializeUserFriendModel = (sequelize: Sequelize) => {
  return UserFriend.init({}, { sequelize });
};

export { initializeUserFriendModel, UserFriend };
