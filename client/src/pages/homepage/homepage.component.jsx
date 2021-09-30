import React, {Profiler} from 'react';
import './homepage.styles.scss'
import Directory from '../../components/directory/directory.component'

const HomePage = () => (
    <div className="homepage">
        {/* Profiler is for testing how long this runs for. See lecture 288: React <Profiler> */}
        {/* <Profiler id="Directory" onRender={(id, phase, actualDuration) => console.log({id, phase, actualDuration}) }> */}
            <Directory />
        {/* </Profiler> */}
    </div>
);

export default HomePage;