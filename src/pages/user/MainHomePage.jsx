import React from 'react';
import CardsTemplate from '../../components/CardsTemplate';
import { Van, ClipboardClock } from 'lucide-react';
import { Link } from 'react-router';
const MainHomePage = () => {
    return (
        <div className="w-4/5 mx-auto mt-3">
            <div>TABLE LIST HISTORY EVENT</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                {/* Create Card */}
                <Link to="reserv">
                    <CardsTemplate
                        title={'Reserv Van'}
                        desc={'Create reserving infomation.'}
                        icon={<Van size={128} />}
                        detail={'Create'}
                    />
                </Link>

                {/* My History Card */}
                <Link to="history">
                    <CardsTemplate
                        title="My history"
                        desc="View your reserving van history."
                        name="Recent"
                        icon={<ClipboardClock size={128} />}
                        detail={'View history'}
                    />
                </Link>
            </div>
        </div>
    );
};

export default MainHomePage;
