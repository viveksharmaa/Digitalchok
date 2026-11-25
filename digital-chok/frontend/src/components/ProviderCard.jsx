import React from "react";

function ProviderCard({
  name,
  service,
  rating,
  price,
  distance,
  available
}) {
  return (
    <div className="provider-card">

      <div className="provider-image">
        👨‍🔧
      </div>

      <div className="provider-info">

        <h3>{name}</h3>

        <p>{service}</p>

        <p>
          ⭐ {rating}
        </p>

        <p>
          📍 {distance} km away
        </p>

        <p>
          ₹{price} starting
        </p>

        <p>
          {available ? "🟢 Available Now" : "🔴 Currently Busy"}
        </p>

        <button>
          View Profile
        </button>

      </div>

    </div>
  );
}

export default ProviderCard;