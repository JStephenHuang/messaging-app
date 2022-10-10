import { KeyboardEventHandler } from "react";
import { BiImage } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

interface MessageBarProperties {
  inputRef: React.RefObject<HTMLInputElement>;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
  sendMessage: () => void;
}

const MessageBar = (props: MessageBarProperties) => {
  const size = "text-[20px]";

  return (
    <div className="flex w-full h-[10%] 2xl:h-[8%] p-3 2xl:p-5 justify-center bg-transparent">
      <div className="flex justify-between items-center w-[95%] bg-zinc-900 rounded-lg px-3">
        <button className="input-button mr-[10px] text-amber-400">
          <BsEmojiSmile className={`${size}`} />
        </button>

        <input
          className="convo-input"
          type="text"
          placeholder="Send a message..."
          ref={props.inputRef}
          onKeyDown={props.handleKeyDown}
        />
        <button
          className="input-button text-amber-400"
          onClick={props.sendMessage}
        >
          <FiSend className={`${size}`} />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
