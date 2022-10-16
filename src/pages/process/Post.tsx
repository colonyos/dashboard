import { PfImage } from '@profabric/react-components';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledUserImage = styled(PfImage)`
  --pf-border: 2px solid #adb5bd;
  --pf-padding: 2px;
  float: left;
`;

const Post = ({ isClearfix = false }: { isClearfix?: boolean }) => {
    return (
        <div className={`post ${isClearfix ? 'clearfix' : ''}`}>
            <div className="user-block">
                <StyledUserImage
                    src="/img/default-profile.png"
                    alt="User"
                    width={40}
                    height={40}
                    rounded
                />
                <span className="username">
                    <Link to="/">6681946db095e0dc2e0408b87e119c0d2ae4f691db6899b829161fc97f14a1d0</Link>
                    <Link to="/" className="float-right btn-tool">
                        <i className="fas fa-times" />
                    </Link>
                </span>
                <span className="description"><b>Function: </b>pick</span>
                <span className="description"><b>Runtime type: </b>bemis-worker</span>
                <span className="description"><b>Submission: </b>2022-04-05 16:40:00</span>
            </div>
            <div className="input-group mb-0" />
        </div>
    );
};

export default Post;
