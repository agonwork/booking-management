"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BookingItem } from "../booking"

interface RouteParams {
  id: string;
}

export default function BookingDetails({ params }: { params: RouteParams }) {
  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function getBooking(id: string): Promise<void> {
    try {
      setLoading(true)
      const response: Response = await fetch("http://localhost:5000/api/bookings", {
        cache: "no-store"
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const bookings: BookingItem[] = await response.json();
      const foundBooking = bookings.find((item: BookingItem) => item.id.toString() === id);
    
      setBooking(foundBooking || null);
      setLoading(false)  
    } catch (error: any) {
      setLoading(false)
      setError(error.message);
    }
  }

  useEffect(() => {
    getBooking(params.id);
  }, [params.id]);

  if (error ) {
    return (
      <div>
        <p>Error: {error}</p>
        <Link href={"/"}>
          <button>Go back</button>
        </Link>
      </div>
    );
  }

  if (!loading) {
    if (!booking) {
      return (
        <div>
          <p>No Booking found.</p>
          <Link href={"/"}>
            <button>Go back</button>
          </Link>
        </div>
      );
    }

    if (booking) {
      return (
        <div>
          <p>
            This Booking is with {booking.doctor_name} for {booking.service}, and it ends on{" "}
            {booking.end_time}.
          </p>
          <Link href={"/"}>
            <button>Go back</button>
          </Link>
        </div>
      );
    }
  } else {
    return (
      <div>Getting booking information...</div>
    )
  }
}
