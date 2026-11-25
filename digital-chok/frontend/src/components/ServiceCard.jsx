import React from "react";

function ServiceCard({ name, icon }) {
  return (
    <div className="service-card">
      <div className="service-icon">
        {icon}
      </div>

      <h3>{name}</h3>
    </div>
  );
}

export default ServiceCard;