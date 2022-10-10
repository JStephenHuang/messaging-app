import { useParams } from "react-router-dom";

interface MessageIconProperties {
  children: React.ReactNode;
  username: string;
}

const MessageIcon = (props: MessageIconProperties) => {
  const params = useParams();

  const size = "text-[12px] xl:text-[16px] 2xl:text-[20px]";

  if (params.user === props.username)
    return (
      <div className="ml-auto">
        <div className="z-20">
          <span className={`bg-amber-400 ${size} text-white rounded-lg p-2`}>
            {props.children}
          </span>
        </div>
        <p className="p-1 xl:mb-[10px] 2xl:mb-[16px]"></p>
      </div>
    );
  else {
    return (
      <>
        <div className="z-20">
          <span className={`bg-zinc-600 ${size} text-white rounded-lg p-2`}>
            {props.children}
          </span>
        </div>
        <p className="text-zinc-400 text-[12px] xl:text-[15px] p-1 xl:p-2">
          {props.username}
        </p>
      </>
    );
  }
};

export default MessageIcon;
