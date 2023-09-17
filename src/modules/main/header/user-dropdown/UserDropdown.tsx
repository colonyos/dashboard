import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '@store/reducers/auth';
import styled from 'styled-components';
import { PfDropdown, PfImage } from '@profabric/react-components';
import { useKeycloak } from "@react-keycloak/web";

const StyledSmallUserImage = styled(PfImage)`
  margin-top: 3px;
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const StyledBigUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
  --pf-border: 3px solid #fff3;
`;

const UserHeader = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 175px;
  padding: 10px;
  text-align: center;
  img {
    z-index: 5;
    height: 90px;
    width: 90px;
    border: 3px solid;
  }
  p {
    z-index: 5;
    font-size: 17px;
    margin-top: 10px;
    small {
      display: block;
      font-size: 12px;
    }
  }
`;

const UserFooter = styled.li`
  padding: 10px;
  &::after {
    display: block;
    clear: both;
    content: '';
  }
  .btn-default {
    color: #6c757d;
  }

  @media (min-width: 576px) {
    .btn-default:hover {
      background-color: #f8f9fa;
    }
  }
`;

export const StyledDropdown = styled(PfDropdown)`
  border: none;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  --pf-dropdown-menu-min-width: 280px;

  .dropdown-item {
    padding: 0.5rem 1rem;
  }

  .text-sm {
    margin-bottom: 0;
  }
  .dropdown-divider {
    margin: 0;
  }
`;

const UserDropdown = () => {
    const navigate = useNavigate();
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.currentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { keycloak } = useKeycloak();

    const logOut = (event: any) => {
        event.preventDefault();
        setDropdownOpen(false);
        keycloak.logout();
        navigate('/login');
    };

    const navigateToProfile = (event: any) => {
        event.preventDefault();
        setDropdownOpen(false);
        navigate('/profile');
    };

    return (
        <StyledDropdown isOpen={dropdownOpen} hideArrow>
            <StyledSmallUserImage
                slot="button"
                src={user.picture}
                fallbackSrc="/img/default-profile.png"
                alt="User"
                width={25}
                height={25}
                rounded
            />
            <div slot="menu">
                <UserHeader className=" bg-info">
                    <StyledBigUserImage
                        src={user.picture}
                        fallbackSrc="/img/default-profile.png"
                        alt="User"
                        width={90}
                        height={90}
                        rounded
                    />
                    <p>
                        {user.email}
                    </p>
                </UserHeader>
                <UserFooter>
                    <button
                        type="button"
                        className="btn btn-default btn-flat"
                        onClick={logOut}
                    >
                        {t<string>('login.button.signOut')}
                    </button>
                </UserFooter>
            </div>
        </StyledDropdown>
    );
};

export default UserDropdown;
