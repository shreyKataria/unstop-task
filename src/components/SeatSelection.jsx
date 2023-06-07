import React , {useState , useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import SeatRow from './SeatRow';
import '../App.css'

function SeatSelection() {

     //defning states
    const [seats, setSeats] = useState(Array(80).fill(false));
    const [errorMessage, setErrorMessage] = useState('');
    const [numSeatsToBook, setNumSeatsToBook] = useState('');
    const [confirmedSeats, setConfirmedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]); 

    //creating local storage to store booked seats
    useEffect(() => {
      const storedSeats = localStorage.getItem('bookedSeats');
      if (storedSeats) {
        setConfirmedSeats(JSON.parse(storedSeats));
      }
    }, []);
    useEffect(() => {
      // Update local storage when confirmedSeats change
      localStorage.setItem('bookedSeats', JSON.stringify(confirmedSeats));
    }, [confirmedSeats]);
  
    //handling input field change
    const handleNumSeatsChange = (event) => {
      setNumSeatsToBook(event.target.value);
      if(event.target.value > 7){
      setErrorMessage('one user can only book seven seats at a time !!');
      }else{
        setErrorMessage('');
      }
      event.preventDefault();
    };

    //handling seat booking and should not more than seven
    const handleSeatBooking = () => {
      const numSeats = parseInt(numSeatsToBook);
  
      if (isNaN(numSeats) || numSeats <= 0 || numSeats > 7) {
        setErrorMessage('Please enter a valid number of seats (1-7).');
        return;
      }
  
      const availableSeats = seats.reduce((available, seat, index) => {
        if (!seat && available.length < numSeats) {
          available.push(index);
        }
        return available;
      }, []);
  
      setSelectedSeats(availableSeats);
      // setConfirmedSeats(false);
    };
    
    
    //handling confirmation of booking 
    const handleBookingConfirmation = () => {
      const updatedSeats = [...seats];
      selectedSeats.forEach((seatIndex) => {
        updatedSeats[seatIndex] = true;
      });
      setSeats(updatedSeats);
      setSelectedSeats([]);
      // setConfirmedSeats(true);
      toast.success('Booking confirmed. Happy Journey!');
      setNumSeatsToBook('');
    };
  

    //rendering seats 
    const renderSeats = () => {
      const seatRows = [];
  
      for (let i = 0; i < 80; i += 7) {

        const endIndex = i + 6 < seats.length ? i + 6 : seats.length - 1;
  
        seatRows.push(
          <SeatRow
          key={i}
          seats={seats}
          startIndex={i}
          endIndex={endIndex}
          selectedSeats={selectedSeats}
          onSeatClick={()=>{}}
          />
        );
      }
  
      return seatRows;
    };
  
    return (
      <div className="seat-reservation">
      <h2>Train Seat Booking System</h2>
        <div className="legend">
          <div className="box green-box"></div>
          <span>Available Seats</span>
          <div className="box grey-box"></div>
          <span>Already booked</span>
          <div className="box blue-box"></div>
          <span>Blocked Seat</span>
        </div>

        <div className="reservation-form">
          <input type="text" placeholder="Enter number of seats (1-7)" value={numSeatsToBook} onChange={handleNumSeatsChange} />
          <button onClick={handleSeatBooking}>Block Seat</button>
          
        </div>
      
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        
        <div className="seat-map">{renderSeats()}</div>

        {selectedSeats.length > 0 && (
          <button className="confirm-button" onClick={handleBookingConfirmation}>
            Confirm Booking
          </button>
        )}
       {confirmedSeats && <Toaster/>}
      </div>
    );
  };

export default SeatSelection