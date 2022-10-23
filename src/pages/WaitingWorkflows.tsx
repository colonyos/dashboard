/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import WorkflowsView from './Workflows';

const Page = () => {
    const navigate = useNavigate();
    return (
        <div>
            <ContentHeader title="Waiting Workflows" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <WorkflowsView navigate={navigate} state={0} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
