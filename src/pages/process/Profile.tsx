import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentHeader } from '@components';
import { PfButton, PfImage } from '@profabric/react-components';
import styled from 'styled-components';

import ActivityTab from './ActivityTab';
import TimelineTab from './TimelineTab';
import SettingsTab from './SettingsTab';

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const Profile = () => {
    const [activeTab, setActiveTab] = useState('ACTIVITY');
    const [t] = useTranslation();

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <ContentHeader title="Profile" />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeTab === 'ACTIVITY' ? 'active' : ''
                                                    }`}
                                                onClick={() => toggle('ACTIVITY')}
                                            >
                                                {t<string>('main.label.activity')}
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${activeTab === 'TIMELINE' ? 'active' : ''
                                                    }`}
                                                onClick={() => toggle('TIMELINE')}
                                            >
                                                {t<string>('main.label.timeline')}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <ActivityTab isActive={activeTab === 'ACTIVITY'} />
                                        <TimelineTab isActive={activeTab === 'TIMELINE'} />
                                        <SettingsTab isActive={activeTab === 'SETTINGS'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
