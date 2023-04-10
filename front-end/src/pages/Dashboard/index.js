import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { folderActions } from '../../store/actions';
import Sider from '../../shared/components/Sider';
import SubDashboard from './SubDashBoard.js'
import Profile from '../Profile';
import FAQs from '../FAQs';
import Tutorial from '../Tutorials';

function Dashboard() {
    const [posts, setPosts] = useState([])
    const [siderItems, setSiderItems] = React.useState([
        "Dashboard",
        "Profile",
        "FAQs",
        "Tutorial",
        "Logout"
    ]);
    const [value, setValue] = React.useState(0);
    const user = useSelector(state => state.authentication.user);

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // .then(response => response.json())
        // .then(json => setPosts(json))
    }, []);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        {/* <Typography>{children}</Typography> */}
                        {children}
                    </Box>
                )}
            </div>
        );
    }
    
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
            <Sider siderItems={siderItems} value={value} handleChange={handleChange}/>
            <Box className='col-lg-10 col-md-10 col-sm-10' sx={{ pt: "62px"}}>
                <TabPanel value={value} index={0}>
                    <SubDashboard />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Profile />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <FAQs />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Tutorial />
                </TabPanel>
                {/* <TabPanel value={value} index={4}>
                    <Tutorial />
                </TabPanel> */}
            </Box>
        </Box>
    );
}

export { Dashboard };