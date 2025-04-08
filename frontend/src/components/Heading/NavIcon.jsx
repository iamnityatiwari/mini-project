import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavIcon = ({ Icon, IconTitle, url }) => {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <div className="group relative flex flex-col items-center">
      <Link to={url} className="flex flex-col items-center">
        
        {/* Ping Effect for Notifications */}
        {IconTitle === 'Notifications' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        )}
        
        <div className="relative">
          {IconTitle === 'Notifications' && (
            <sup className="absolute size-2 bg-red-500 rounded-full left-5"></sup>
          )}
          
          {/* Icon with Active Color */}
          <Icon
            className={`${
              isActive ? 'text-blue-600' : 'text-Light-Beige'
            } hover:text-white transition-colors duration-200`}
            size={28}
          />
        </div>

        {/* Tooltip */}
        <span className="absolute top-8 px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {IconTitle}
        </span>
      </Link>
    </div>
  );
};
