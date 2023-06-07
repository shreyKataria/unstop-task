import React from 'react';
import Seat from './Seat';

const SeatRow = ({ seats, startIndex, endIndex, selectedSeats}) => {
  const renderSeats = () => {
    const seatElements = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const seatIndex = i;
      const isReserved = seats[seatIndex];
      const isSelected = selectedSeats.includes(seatIndex);
      

      seatElements.push(
        <Seat
          key={seatIndex}
          seatIndex={seatIndex}
          isReserved={isReserved}
          isSelected={isSelected}
        />
      );
    }

    return seatElements;
  };

  return <div className="row">{renderSeats()}</div>;
};

export default SeatRow;
