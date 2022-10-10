import { Sequelize, Model, DataTypes, CreationOptional, BelongsToSetAssociationMixin } from "sequelize";
import { Friend } from "./friend";
import { Room } from "./room";
import { User } from "./user";

class Message extends Model {
  declare id: CreationOptional<number>;
  declare content: string;
  declare uuid: string;
  declare username: string;

  declare RoomId: number;
  declare Room: Room;
  declare setRoom: BelongsToSetAssociationMixin<Room, number>;

  declare FriendId: number;
  declare Friend: Friend;
  declare setFriend: BelongsToSetAssociationMixin<Friend, number>;

  declare UserId: number;
  declare User: User;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
}

const initializeMessageModel = (sequelize: Sequelize) => {
  return Message.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    { sequelize }
  );
};

export { initializeMessageModel, Message };
