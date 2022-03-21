import { Avatar, Box, Icon, IconButton, Menu, MenuItem } from '@material-ui/core'
import { useState } from 'react';
import { useAuthContext } from './authContext';
import { useStyles } from './Style';


export default function User() {

    const auth = useAuthContext();
    const design = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar>
                    <Icon>person</Icon>
                </Avatar>
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box className={design.menu} >
                    <Avatar>
                        <Icon>(:)</Icon>
                    </Avatar>
                    <div>{auth.user.name}</div>
                    <small>{auth.user.email}</small>
                </Box>
                <MenuItem onClick={auth.onSignOut}>Logout</MenuItem>
            </Menu>
        </div>

    )
}
