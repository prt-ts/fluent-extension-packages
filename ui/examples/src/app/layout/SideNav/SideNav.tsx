import {
  Button,
  Divider,
  DrawerBody,
  DrawerFooter,
  InlineDrawer,
  ToggleButton,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  ArrowUploadRegular,
  DismissRegular,
  HomeRegular,
  SettingsRegular,
  SignOutRegular,
} from '@fluentui/react-icons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirm } from '@prt-ts/fluent-common-features';

const useSideNavStyles = makeStyles({
  sideNavRoot: {
    height: '100%',
    width: '250px',
    ...shorthands.padding(0),
    backgroundColor: tokens.colorNeutralStroke2,

    '@media (500px <= width <= 1000px)': {
      width: '60px',
    },

    '@media (width < 500px)': {
      display: 'none',
    },
  },

  sideNavBody: {
    backgroundColor: tokens.colorNeutralStroke2,
  },

  menu: {
    listStyleType: 'none',
    ...shorthands.padding(0),
    ...shorthands.margin(0),
  },
  menuItem: {
    cursor: 'pointer',
    width: '100%',
    ...shorthands.padding(0),
    marginBottom: tokens.spacingVerticalS,
    '&:hover': {
      backgroundColor: tokens.colorNeutralStroke1,
    },
  },

  menuItemBtn: {
    width: '100%',
    textAlign: 'left',
    alignItems: 'start',
    justifyContent: 'start',
  },

  menuItemSelected: {
    backgroundColor: tokens.colorNeutralStroke1,
  },
});

export const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { confirm } = useConfirm();

  const goTo = (path: string) => {
    navigate(path);
  };

  const styles = useSideNavStyles();
  return (
    <InlineDrawer
      separator
      open={true}
      style={{
        height: '100%',
      }}
      className={styles.sideNavRoot}
    >
      <DrawerBody className={styles.sideNavBody}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <ToggleButton
              icon={<HomeRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/')}
              checked={location.pathname === '/'}
            >
              Home
            </ToggleButton>
          </li>
          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/table' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/table')}
              checked={location.pathname === '/table'}
            >
              Table
            </ToggleButton>
          </li>
          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/table2' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/table2')}
              checked={location.pathname === '/table2'}
            >
              Table2
            </ToggleButton>
          </li>
          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/editableGrid' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/editableGrid')}
              checked={location.pathname === '/editableGrid'}
            >
              Editable Grid
            </ToggleButton>
          </li>

          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/react-hook-form' &&
                  styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/react-hook-form')}
              checked={location.pathname === '/react-hook-form'}
            >
              React Hook Form
            </ToggleButton>
          </li>

          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/signup' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/signup')}
              checked={location.pathname === '/signup'}
            >
              Sign Up
            </ToggleButton>
          </li>

          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/features' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/features')}
              checked={location.pathname === '/features'}
            >
              Features
            </ToggleButton>
          </li>

          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/controls' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/controls')}
              checked={location.pathname === '/controls'}
            >
              Controls
            </ToggleButton>
          </li>

          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/input' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/input')}
              checked={location.pathname === '/input'}
            >
              Input
            </ToggleButton>
          </li>

          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/dummy-edit' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/dummy-edit')}
              checked={location.pathname === '/dummy-edit'}
            >
              Dummy Edit
            </ToggleButton>
          </li>

          <li className={styles.menuItem}>
            <ToggleButton
              icon={<ArrowUploadRegular />}
              className={mergeClasses(
                styles.menuItemBtn,
                location.pathname === '/dummy-edit' && styles.menuItemSelected
              )}
              appearance="transparent"
              onClick={() => goTo('/dummy-edit')}
              checked={location.pathname === '/dummy-edit'}
            >
              Dummy Edit
            </ToggleButton>
          </li>
        </ul>
      </DrawerBody>
      <DrawerFooter>
        <div
          style={{
            width: '100%',
          }}
        >
          <Button
            onClick={() => {
              navigate('/settings');
            }}
            appearance="transparent"
            icon={<SettingsRegular />}
          >
            Settings
          </Button>
          <Divider appearance="strong" />
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
        </div>
      </DrawerFooter>
    </InlineDrawer>
  );
};
