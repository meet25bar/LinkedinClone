import { Bell, BriefcaseBusiness, Home, MessageCircleMore, Users } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface NavItem {
  src: string;
  icon: ReactNode;
  text: string;
}

const navItems: NavItem[] = [
  {
    src: '/home',
    icon: <Home />,  
    text: 'Home',
  },
  {
    src: '/networks',
    icon: <Users />,  
    text: 'My Network',
  },
  {
    src: '/job',
    icon: <BriefcaseBusiness />,  
    text: 'Jobs',
  },
  {
    src: '/message',
    icon: <MessageCircleMore />,  
    text: 'Messaging',
  },
  {
    src: '/notification',
    icon: <Bell />,  
    text: 'Notifications',
  },
];

const NavItems: React.FC = () => {
  return (
    <div className="flex gap-8">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer text-[#666666] hover:text-black"
        >
          <span>{item.icon}</span>
          <Link className="text-xs" href={item.src}>
            {item.text}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavItems;
