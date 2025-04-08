import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation for routing

export const MobileIcon = ({ Icon, IconTitle, url, closeOn }) => {
  const location = useLocation(); // Get the current path

  // Conditional class for active icon
  const isActive = location.pathname === url ? "text-white font-semibold" : "text-gray-400";

  return (
    <Link
      onClick={closeOn}
      to={url}
      className={`flex items-center text-sm font-serif hover:text-white p-1 ${isActive}`}
    >
      <Icon className="mr-2" size={18} />
      {IconTitle}
    </Link>
  );
};
