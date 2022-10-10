import { Link, useParams } from "react-router-dom";

interface SidebarIconProperties {
  icon: any;
  text: string;
  section: string;
  selectedSection: string;
}

const SidebarIcon = (props: SidebarIconProperties) => {
  const params = useParams();
  return (
    <Link
      to={`/${params.user}/${props.section}`}
      className={
        props.selectedSection === props.section
          ? `sidebar-icon-active group`
          : "sidebar-icon group"
      }
    >
      {props.icon}
      <span className="sidebar-tooltip group-hover:scale-100">
        {props.text}
      </span>
    </Link>
  );
};

export default SidebarIcon;
