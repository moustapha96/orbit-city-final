import React from "react";

const PromotionalHeader = ({ title, subtitle }) => {
  return (
    <div className="promotional-header">
      <h1 className="promotional-header-title">{title}</h1>
      {subtitle && <p className="promotional-header-subtitle">{subtitle}</p>}
    </div>
  );
};

export default PromotionalHeader;
