import { ReactNode } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { logout } from '../../Reducers/AuthSlice'
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

interface SidebarProps {
    children: ReactNode;
}
const Sidebar = ({ children }: SidebarProps) => {
    const navigate = useNavigate();  // React Router navigation
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    };
    const handleChange = (event: any) => {
        i18n.changeLanguage(event?.target.value);
    };
    // Navigation menu items
    const menuItems = [
        { text: t('dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
        { text: t('projects'), icon: <FolderIcon />, path: '/projects' },
        { text: t('estimations'), icon: <DescriptionIcon />, path: '/estimations' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar Drawer */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
                </Typography>

                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => navigate(item.path)}  // Navigate using React Router
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                {/* Logout Item */}
                <List sx={{ position: 'absolute', bottom: 50, width: '100%' }}>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("logout")} />
                    </ListItem>
                </List>
                <List sx={{ position: 'absolute', bottom: 0, width: '100%' }}>

                    <ListItem >
                        <select
                            defaultValue={i18n.language}
                            // style={{ width: 120 }}
                            onChange={handleChange}
                        >
                            <option value="en">English</option>
                            <option value="jp">Japanese</option>
                        </select>
                    </ListItem>
                </List>
            </Drawer>

            {/* Main content area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    // ml: `${drawerWidth}px`, // To avoid content behind the sidebar
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;
