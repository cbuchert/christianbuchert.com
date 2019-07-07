import NavLink from "./NavLink";

export default function NavLinks({links}) {
    return (
        <div>
            {links.map(link => {
                return <NavLink
                    key={link.title}
                    {...link}
                />
            })}
        </div>
    );
}
