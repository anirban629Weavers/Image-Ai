import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { Link, } from 'react-router-dom';
import { ChatRounded, PictureAsPdf, WbIncandescent, ImageSearch, Exposure, SentimentNeutral, Reviews } from '@mui/icons-material';

import { useAuthStore, useChatStore } from '../store';
import usePDFChatStore from '../store/usePDFChatStore';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));




export default function NavbarWithLeftDrawer({ children }: { children: React.ReactNode }) {

    const theme = useTheme();


    // ! USER MENU SETTINGS
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { logout, authenticated } = useAuthStore()
    const { deleteChats } = useChatStore()
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        logout()
        deleteChats()
        useAuthStore.persist.clearStorage()
        useChatStore.persist.clearStorage() // ! clear chat data from Localstorage
        usePDFChatStore.persist.clearStorage() // ! clear pdf chats data from Localstorage
    }
    // ! USER MENU SETTINGS

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const settingsUserMenu = ["Profile", "Account", "Dashboard", "Logout"];
    const settingsUserMenu = ["Logout"];
    const settingsFunctions: Array<{
        title: string;
        link: string;
        icon: React.ReactElement | null;
    }> = [
            {
                title: "Home page",
                link: "/",
                icon: <ChatRounded />
            },
            {
                title: "Talk with Pdf",
                link: "/talk-with-pdf",
                icon: <PictureAsPdf />,
            },
            {
                title: "Text to Image",
                link: "/text-to-image",
                icon: <ImageSearch />,
            },
            {
                title: "Modify your Image",
                link: "/modify-image",
                icon: <Exposure />,
            },
            {
                title: "Analyze sentiment",
                link: "/sentiment-analysis",
                icon: <SentimentNeutral />,
            },
            {
                title: "Analyze Review",
                link: "/moderator-review",
                icon: <Reviews />,
            },
        ];


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        AI Playground
                    </Typography>

                    {/* USER MENU*/}
                    {authenticated ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '50px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settingsUserMenu.map((setting, index) => {
                                    return <MenuItem key={index} onClick={() => {
                                        if (setting === "Logout") { logoutHandler() }
                                        handleCloseUserMenu()
                                    }}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                })}
                            </Menu>
                        </Box>
                        : <></>}
                    {/* USER MENU*/}


                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {settingsFunctions.map(({ icon, link, title }, index) => (
                        <Link to={link} key={index} style={{ textDecoration: "none", color: "gray", fontWeight: "bold" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {icon ? icon : <WbIncandescent />}
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}
