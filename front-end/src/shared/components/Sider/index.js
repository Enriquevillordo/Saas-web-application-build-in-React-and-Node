import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/actions';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Sider(Props) {
    const siderItems = Props.siderItems;
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(userActions.logout()); 
    }
    return (
        <Box className="col-md-2 col-lg-2 col-sm-2" sx={{minHeight: "100vh", p: 0, background: "#dde1d5"}}>
            <Typography variant='h4' sx={{display: 'block', height: "110px", py: 4, textAlign: "center", fontWeight: "bold"}}>SubtitleO</Typography>
            <Box component="img" width={"100%"} src="/assets/img/rough_line.png" sx={{ mb: 3, cursor: "pointer"}}/>
            <Tabs
            orientation="vertical"
            value={Props.value}
            onChange={Props.handleChange}
            aria-label="Vertical tabs example"
            sx={{
                p: 4,
                '& .MuiTabs-scroller .MuiTabs-indicator': {
                  background: "transparent"
                }
              }}
            >
                {
                    siderItems.map((siderItem, index) => {
                        if(siderItem == "Logout") {
                            return (
                                <Tab key={index} label={<a onClick={handleLogout}>Logout</a>} sx={{alignItems: "flex-start", '& a': { color: 'inherit'}, '&.Mui-selected': { color: "black", background: "#fff2c5"} }} />)
                        } else {
                            return (<Tab key={index} label={siderItem} {...a11yProps(index)} sx={{alignItems: "flex-start", '&.Mui-selected': { color: "black", background: "#fff2c5" } }}/>)
                        }
                    })
                }
            </Tabs>
        </Box>
    );
}