import React from "react";
import { BookingItem } from "../booking/booking"


const BookingList = ({bookings}) => {
  const bookingsList = bookings.map((booking: BookingItem) => (
    <li id="bookings-list" key={booking.id}>
      <a href={"booking/" + booking.id}>
        A booking on {booking.date} starting at {booking.start_time}
      </a>
    </li>
  ));
  return (
    <div id="bookings-body">
      <ul>{bookingsList}</ul>
    </div>
  );
};

export default BookingList;
