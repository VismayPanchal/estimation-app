import { ReactNode } from 'react';
import Sidebar from './Sidebar';  // Path to your Sidebar component

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Sidebar>
            {children}  {/* Main content goes here */}
        </Sidebar>
    );
};

export default MainLayout;
