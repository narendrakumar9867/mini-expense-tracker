import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  /**
   * The handler used when the preview is expanded
   */
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  /**
   * The state of the Account popover
   * @default false
   */
  open: PropTypes.bool,
};

const userFullName = sessionStorage.getItem("userFullName") || "Bharat Kashyap";
const userEmail = sessionStorage.getItem("userEmail") || "bharatkashyap@outlook.com";
const userImage = sessionStorage.getItem("userImage") || 'https://avatars.githubusercontent.com/u/19550456';

const accounts = [
  {
    id: 1,
    name: userFullName,
    email: userEmail,
    image: userImage,
    projects: [
      {
        id: 3,
        title: 'Project X',
      },
    ],
  },
];

function SidebarFooterAccountPopover({ handleImageChange, hiddenFileInput, uploadedImage }) {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "0.95rem",
                  bgcolor: account.color,
                  cursor: "pointer",
                }}
                src={uploadedImage}
                alt={account.name ?? ""}
                onClick={() => hiddenFileInput.current.click()}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

SidebarFooterAccountPopover.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
  hiddenFileInput: PropTypes.object.isRequired,
  uploadedImage: PropTypes.string.isRequired,
};

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const hiddenFileInput = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(sessionStorage.getItem("uploadedImage") || userImage);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      sessionStorage.setItem("uploadedImage", reader.result);
      uploadToServer(file);
    };
  };

  const uploadToServer = (file) => {
    var myHeaders = new Headers();
    const token = "adhgsdaksdhk938742937423"; // Replace with actual token
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUploadedImage(result.img_url);
        sessionStorage.setItem("uploadedImage", result.img_url);
      })
      .catch((error) => console.log("error", error));
  };

  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: (props) => (
          <SidebarFooterAccountPopover
            {...props}
            handleImageChange={handleImageChange}
            hiddenFileInput={hiddenFileInput}
            uploadedImage={uploadedImage}
          />
        ),
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function DashboardLayoutAccountSidebar(props) {
  const { window } = props;
  const [uploadedImage, setUploadedImage] = useState(sessionStorage.getItem("uploadedImage") || userImage);

  // define demoWindow at the beginning
  const demoWindow = window !== undefined ? window() : undefined;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setUploadedImage(imageUrl);
      sessionStorage.setItem("uploadedImage", imageUrl);
      uploadToServer(file);
    };
  };

  const uploadToServer = (file) => {
    var myHeaders = new Headers();
    const token = "adhgsdaksdhk938742937423"; // Replace with actual token
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUploadedImage(result.img_url);
        sessionStorage.setItem("uploadedImage", result.img_url);
      })
      .catch((error) => console.log("error", error));
  };


  const [session, setSession] = React.useState({
    user: {
      name: sessionStorage.getItem("userFullName") || "Bharat Kashyap",
      email: sessionStorage.getItem("userEmail") || "bharatkashyap@outlook.com",
      image: 'https://avatars.githubusercontent.com/u/19550456',
      },
  });


  React.useEffect(() => {
    // for prevent running in server side rendering
    if (typeof window === "undefined") return;

    const updateUser = () => {
      setSession({
        user: {
          name: sessionStorage.getItem("userFullName") || "Bharat Kashyap",
          email: sessionStorage.getItem("userEmail") || "bharatkashyap@outlook.com",
          image: sessionStorage.getItem("uploadedImage") || userImage,
        },
      });
    };

    updateUser();

    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={{
        signIn: () => setSession({
          user: {
            name: sessionStorage.getItem("userFullName") || "Bharat Kashyap",
            email: sessionStorage.getItem("userEmail") || "bharatkashyap@outlook.com",
            image: 'https://avatars.githubusercontent.com/u/19550456',
          }
        }),
        signOut: () => setSession(null),
      }}
      session={session}
    >
      <DashboardLayout
        slots={{ toolbarAccount: () => null, sidebarFooter: (props) => <SidebarFooterAccount {...props} /> }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccountSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutAccountSidebar;