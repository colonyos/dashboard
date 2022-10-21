/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import { useNavigate } from "react-router-dom";
import ProcessesView from './Processes';

const Page = () => {
    const navigate = useNavigate();
    return (
        <div>
            <ContentHeader title="Failed processes" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <ProcessesView navigate={navigate} state={3} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
