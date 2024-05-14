import {
  Button,
  Divider,
  Persona,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import React from 'react';
import {
  TextAlignJustifyRegular,
  TextAlignJustifyFilled,
  bundleIcon,
  SignOutRegular,
  SettingsRegular,
  DismissRegular,
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '@prt-ts/fluent-common-features';

const ToggleIcon = bundleIcon(TextAlignJustifyRegular, TextAlignJustifyFilled);

const useNavbarStyles = makeStyles({
  navbarRoot: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(0, tokens.spacingHorizontalXL),
  },

  sideNavToggleBtn: {
    color: tokens.colorNeutralStrokeOnBrand,
    minWidth: '40px',
    width: '30px',
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: tokens.fontSizeBase600,
  },

  logo: {
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: '90%%',
      width: '90%',
      minWidth: '30px',
    },

    '& span': {
      fontSize: tokens.fontSizeBase500,
      fontWeight: tokens.fontWeightBold,
      color: tokens.colorNeutralStrokeOnBrand,
      ...shorthands.padding(0, tokens.spacingHorizontalM),
    },
  },

  profile: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },

  persona: {
    color: tokens.colorNeutralStrokeOnBrand,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const Navbar: React.FC = () => {
  const userInfo = {
    name: 'Pradeep Raj Thapaliya',
    email: 'example@email.com',
  };
  const navigate = useNavigate();
  const { confirm } = useConfirm();

  const styles = useNavbarStyles();
  return (
    <div className={styles.navbarRoot}>
      <div className={styles.logo}>
        <Button
          className={styles.sideNavToggleBtn}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('Side Nav Toggle Clicked');
          }}
          appearance="primary"
          aria-label="Toggle Side Navigation"
        >
          <ToggleIcon />
        </Button>
        <Button appearance="transparent" onClick={() => navigate('/')}>
          <img src="logo.svg" alt="Logo" />
          <span>Example</span>
        </Button>
      </div>
      <div>
        <Popover withArrow>
          <PopoverTrigger disableButtonEnhancement>
            <Button appearance="transparent">
              <Persona
                className={styles.persona}
                avatar={{ color: 'cornflower' }}
                name={userInfo?.name}
                size="extra-small"
                primaryText={{
                  className: styles.persona,
                }}
              />
            </Button>
          </PopoverTrigger>

          <PopoverSurface tabIndex={-1}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
              }}
            >
              <Persona
                avatar={{ color: 'cornflower' }}
                name={userInfo?.name}
                secondaryText={userInfo?.email}
                size="huge"
                textPosition="below"
              />
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <Button
                  onClick={() => {
                    confirm({
                      title: 'Sign Out!',
                      message: 'Are you sure you want to sign out?',
                      onConfirm: () => {
                        // eslint-disable-next-line no-console
                        console.log('Sign Out Clicked');
                      },
                      confirmButtonProps: {
                        children: 'Sign Out',
                        icon: <SignOutRegular />,
                      },
                      cancelButtonProps: {
                        children: 'Cancel',
                        icon: <DismissRegular />,
                      },
                    });
                  }}
                  appearance="transparent"
                  icon={<SignOutRegular />}
                >
                  Sign Out
                </Button>
                <Divider vertical />
                <Button
                  onClick={() => {
                    navigate('/settings');
                  }}
                  appearance="transparent"
                  icon={<SettingsRegular />}
                >
                  Settings
                </Button>
              </div>
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};
