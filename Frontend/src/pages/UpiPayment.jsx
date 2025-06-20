import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const UpiPayment = () => {
  const { appointmentId } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const [appointment, setAppointment] = useState(null);


  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(backendUrl + `/api/user/appointment/${appointmentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointment(data.appointment);
      } catch (err) {
        console.error("Failed to fetch appointment", err);
      }
    };

    fetchAppointment();
  }, [appointmentId, backendUrl, token]);

  if (!appointment) return <p className="p-4">Loading appointment info...</p>;

  const upiLink = `upi://pay?pa=bhagyashreeumbarkar14304-1@okhdfcbank&pn=Admin&am=${appointment.profData.rates}&tn=Appointment with ${appointment.profData.name}&cu=INR`;

  return (
   <div className="min-h-screen flex justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center h-[400px] my-25 bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">
                Pay with UPI for {appointment.profData.name}
            </h2>
            <QRCode value={upiLink} style={{ height: "200px", width: "200px" }} />
            <a href={upiLink} className="mt-4 text-blue-600 underline text-sm">
                Open in UPI App
            </a>
        </div>
    </div>

  );
};

export default UpiPayment;
