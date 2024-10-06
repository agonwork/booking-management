"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function NewBooking() {
  const [service, setService] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const currentDate = new Date().toISOString().split("T")[0];

  interface BookingRequestBody {
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData: BookingRequestBody = {
      service,
      doctor_name: doctorName,
      start_time: startTime,
      end_time: endTime,
      date,
    };

    const response: Response = await fetch(
        "http://localhost:5000/api/bookings",
      {
        method: "POST",
        cache:"no-store",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify(bookingData),
      }
    );

    console.log({response, bookingData})

    if (response.ok) {
      router.push("/"); // Redirect to bookings list on success
    } else {
      // Handle errors (not shown here)
      setError("Error inserting booking data");
    }
  };


  const formString = <div className="form-wrapper">
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td width="200px">Type of service</td>
            <td>
              <select onChange={(e) => setService(e.target.value)}>
                <option value=""></option>
                <option value="Service A">Service A</option>
                <option value="Service B">Service B</option>
                <option value="Service C">Service C</option>
                <option value="Service D">Service D</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Doctor</td>
            <td>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Doctor Name"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Date</td>
            <td>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={currentDate}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Start Time</td>
            <td>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
                min={service}
                required
              />
            </td>
          </tr>
          <tr>
            <td>End Time</td>
            <td>
              <input
                type="time"
                value={endTime}
                min={startTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
                required
              />
            </td>
          </tr>

          <tr>
            <td>
              <button id="submitBtn" type="submit">
                Create Booking
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>

  return (
    <div>
      {formString}
      {error}
    </div>
  );
}
