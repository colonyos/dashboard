import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { PfImage } from '@profabric/react-components';
import styled from 'styled-components';
import { SidebarSearch } from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';

export interface IMenuItem {
    name: string;
    icon: string;
    path?: string;
    children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
    {
        name: "Dashboard",
        icon: "fas fa-tachometer-alt",
        path: '/'
    },
    {
        name: "Executors",
        //icon: "fas fa-microchip",
        icon: "fas fa-robot",
        path: '/executors'
    },
    {
        name: "Functions",
        icon: "fas fa-code",
        path: '/functions'
    },
    {
        name: "Processes",
        icon: "fas fa-cube",
        path: '/processes'
    },
    {
        name: "Workflows",
        icon: "fas fa-cubes",
        path: '/workflows'
    },
    {
        name: "Filesystem",
        //icon: "fa-solid fa-arrows-spin",
        icon: "fas fa-folder",
        path: '/filesystem'
    },
    {
        name: "Cron",
        //icon: "fa-solid fa-arrows-spin",
        icon: "fas fa-clock",
        path: '/crons'
    },
    {
        name: "Generators",
        //icon: "fa-solid fa-arrows-spin",
        icon: "fas fa-heartbeat",
        path: '/generators'
    },
    {
        name: "Server",
        //icon: "fa-solid fa-arrows-spin",
        icon: "fas fa-server",
        path: '/server'
    },
];

const StyledBrandImage = styled(PfImage)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
    const user = useSelector((state: any) => state.auth.currentUser);
    const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
    const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
    const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

    return (
        <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
            <center>
                <Link to="/" className="brand-link">
                    <img width="60px" src="/img/logo_dark.png" />
                </Link>
            </center>
            <div className="sidebar">

                <nav className="mt-2" style={{ overflowY: 'hidden' }}>
                    <ul
                        className={`nav nav-pills nav-sidebar flex-column${menuItemFlat ? ' nav-flat' : ''
                            }${menuChildIndent ? ' nav-child-indent' : ''}`}
                        role="menu"
                    >
                        {MENU.map((menuItem: IMenuItem) => (
                            <MenuItem
                                key={menuItem.name + menuItem.path}
                                menuItem={menuItem}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
