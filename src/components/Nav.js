import { Link, useParams, Outlet } from "react-router-dom";

const NavLink = ({ page, selected }) => {
    const title = page.charAt(0).toUpperCase() + page.slice(1);
    return <Link to={'/' + page}>
        <li className={selected ? 'NavLink-Active' : 'NavLink'}>{title}</li></Link>
}

const NavBar = (test) => {
    const { page } = useParams() || "home";
    // console.log(page)
    return (<>
        <nav>
            <ul className='nav'>
                <NavLink page='home' selected={page === 'home'} />
                <NavLink page='options' selected={page === 'options'} />
                <NavLink page='results' selected={page ==='results'} />
                <NavLink page='board' selected={page==='board'}/>
                <NavLink page='about' selected={page === 'about'} />
            </ul>
        </nav>
        <Outlet />
    </>
    );
};

export { NavBar };