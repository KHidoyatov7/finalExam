import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { HiOutlineShoppingBag } from 'react-icons/hi'; // react-icons'dan import qilish
import { Font } from '../../types';
import "./Sidebar.scss"
import { Flex } from 'antd';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ right: open });
  };

  const [selectedFonts, setSelectedFonts] = React.useState([]);

  React.useEffect(() => {
    const storedFonts = localStorage.getItem('selectedFonts');
    if (storedFonts) {
      setSelectedFonts(JSON.parse(storedFonts));
    }
  }, []);
  const removeFont = (font: string) => {
    localStorage.removeItem('selectedFonts');
  }

  const list = () => (
    <Box
      sx={{
         width: 350,
         bgcolor: '#2d2e31', 
         height: '100%',
        }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
 {
  selectedFonts.map((font: Font) => (
    <div className='fonts' key={font.fontName}>
      <div className='fonts__box'>
        <h3 className='fonts__box__h3'>{font.fontName}</h3>
        <div className='fonts__box__block'>
          {font.variants.map((variant, index) => (
            <p key={index}>{variant}</p>
          ))}
          <button onClick={() => removeFont(font.fontName)} className='btn'>Remove All</button>
        </div>
      </div>
    </div>
  ))
}

      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  return (
    <div>
      {/* Button ichida endi HiOutlineShoppingBag ikonkasi ishlatilmoqda */}
      <Button onClick={toggleDrawer(true)}>
        <HiOutlineShoppingBag />
      </Button>
      <SwipeableDrawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}