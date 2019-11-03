import NavLink from "./NavLink";

export default function NavLinks({ links }) {
  const navLinkContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  };

  return (
    <div style={navLinkContainerStyles}>
      {links.map(link => {
        return <NavLink
          key={link.title}
          {...link}
        />;
      })}
    </div>
  );
}
