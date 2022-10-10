import { KeyboardEvent, useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import { useAPIs } from "../../context/APIContext";
import { useSocket } from "../../context/SocketContext";

import ContentWrap from "../content_wrap";
import MessageBar from "../message_bar";
import MessageIcon from "../message_icon";
import DefaultMessage from "../default_message";

type MessageType = {
  id: number;
  content: string;
  username: string;
};

const FriendContent = () => {
  const APIContext = useAPIs();
  const SocketContext = useSocket();
  const params = useParams();
  const messageInput = useRef<HTMLInputElement>(null);

  const lastMessageRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Array<MessageType>>([]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (messageInput.current) {
      if (event.key === "Enter" && messageInput.current.value !== "") {
        sendMessage();
        messageInput.current.value = "";
      }
    }
  };

  const sendMessage = () => {
    if (
      params.uuid &&
      messageInput.current &&
      messageInput.current.value !== ""
    ) {
      const uuid = params.uuid;
      const content = messageInput.current.value;
      messageInput.current.value = "";
      APIContext.sendMessage(uuid, content);
    }
  };

  const addMessage = (message: MessageType) => {
    console.log(message.username);
    setMessages((messages) => [...messages, message]);
  };

  // get messages after clicking a room, and after sending a message

  useEffect(() => {
    if (params.uuid) {
      APIContext.getMessages(params.uuid).then((value) => {
        setMessages(value.data);
      });
      const event = `message/${params.uuid}`;
      SocketContext.socket.on(event, addMessage);

      return () => {
        SocketContext.socket.off(event, addMessage);
      };
    }
  }, [params.uuid]);

  // scroll down to the last message after every sent message

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // front end messages

  const frontEndMessages = messages.map((message, key) => {
    return (
      <>
        <MessageIcon key={key} username={message.username}>
          {message.content}
        </MessageIcon>
        <div ref={lastMessageRef} />
      </>
    );
  });
  if (params.uuid) {
    return (
      <ContentWrap>
        <div className="h-[80%] xl:h-[90%] 2xl:h-[92%] w-full flex flex-col p-5 overflow-y-auto z-20 ">
          {frontEndMessages}
        </div>
        <MessageBar
          inputRef={messageInput}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
        />
      </ContentWrap>
    );
  }
  return (
    <ContentWrap>
      <DefaultMessage section="friends" />
    </ContentWrap>
  );
};

export default FriendContent;
