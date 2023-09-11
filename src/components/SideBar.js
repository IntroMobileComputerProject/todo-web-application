import {slide as Menu} from 'react-burger-menu'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React from 'react';

export default function SideBar(props){
    var styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: '#373a47'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenuWrap: {
            position: 'fixed',
            height: '100%'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em',
            fontSize: '1.50em',
            overflowY: 'hidden'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItem: {
            display: 'block',  // Changed from inline-block
            color: '#fff',
            padding: '10px 20px', // Added padding for better spacing
            textDecoration: 'none',
            transition: 'background-color 0.2s', // Added transition for smoother hover effect
        },
        bmItemList: {
            padding: '10px 0', // Added padding for better spacing
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    }
    return (
        <Menu props={props} styles={styles}>
            {/* Using React Router's Link for smoother client-side transitions */}
            <Link style={{color: 'rgb(184,183,173)'}} className="menu-item" to="/main">
                <HomeIcon style={{padding: '0 10px 0 0'}}/>
                Main
            </Link>
            <Link style={{color: 'rgb(184,183,173)'}} className="menu-item" to="/credit">
                <PeopleIcon style={{padding: '0 10px 0 0'}} />
                Credit
            </Link>
            <Link style={{color: 'rgb(184,183,173)'}} className="menu-item" to="/signout">
                <ExitToAppIcon style={{padding: '0 10px 0 0'}}/>
                Sign Out
            </Link>
        </Menu>
    );
}