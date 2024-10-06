"use client"
import BookingList from "./bookingsComponent/BookingList";
import { BookingItem } from "./booking/booking";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/bookings", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const bookingsRes = await res.json();
        setBookings(bookingsRes);
        setLoading(false);
      } catch (e: any) {
        console.log({ e });
        setError(e.message);
        setLoading(false);
      }
    };

    getBookings();
  }, []); 

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  // if (error) {
  //   return <div>Error getting bookings: {error}</div>;
  // }

  return (
    <div>
      <ul>
        <BookingList bookings={bookings} />
      </ul>

      <button id="booking-list-button">
        <a href="/booking">Create new booking</a>
      </button>
    </div>
  );
};

export default Home;
