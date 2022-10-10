interface DefaultMessageProperties {
  section: string;
}

const DefaultMessage = (props: DefaultMessageProperties) => {
  return (
    <div className="flex mt-auto mb-auto text-[20px]">
      You have no selected{" "}
      <p className="text-amber-400 ml-2">{props.section}</p>
    </div>
  );
};

export default DefaultMessage;
