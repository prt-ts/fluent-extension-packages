import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { SideNav } from './SideNav';
import { useLayoutStyles } from './useLayoutStyles';
import Footer from './Footer/Footer';
export const Layout: React.FC = () => {
  const styles = useLayoutStyles();

  // if the user is logged in, show the layout
  return (
    <div className={styles.root}>
      <nav className={styles.navBarContainer}>
        <Navbar />
      </nav>
      <section className={styles.mainContainer}>
        {/* <Show when={isSideNavOpen}> */}
        <div className={styles.sideNavContainer}>
          <SideNav />
        </div>
        {/* </Show> */}
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </section>
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </div>
  );
};
