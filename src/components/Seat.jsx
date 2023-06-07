import React from 'react';

const Seat = ({ seatIndex, isReserved, isSelected }) => {
  // const handleClick = () => {
  //   if (!isReserved) {
  //     onSeatClick(seatIndex);
  //   }
  // };

  return (
    <div
      className={`seat ${isReserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
      // onClick={handleClick}
    >
      {seatIndex + 1}
    </div>
  );
};

export default Seat;
