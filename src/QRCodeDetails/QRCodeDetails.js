import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const QRCodeDetails = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/qr/${id}`);
        setQrData(response.data); // Set the fetched data in state
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("QR Code not found.");
        } else {
          setError("Failed to fetch QR data.");
        }
        console.error("Error fetching QR data:", error);
      }
    };
    fetchQRData();
  }, [id]);

  const handleBack = () => {
    navigate("/"); // Navigate back to home page
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img
            src='https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp'
            alt="UPI Logo"
            style={styles.upiLogo}
          />
          <div>
            <h2 style={styles.upiName}>Paying to: {qrData?.name || 'UPI Transaction'}</h2>
          </div>
        </div>
        {error ? (
          <p style={styles.errorText}>{error}</p>
        ) : qrData ? (
          <div style={styles.qrContainer}>
            <img src={qrData.qrCodeUrl} alt="QR Code" style={styles.qrImage} />
            <div style={styles.details}>
              <p><strong>Order ID:</strong> {qrData._id}</p>
              <p><strong>Amount:</strong> ₹{qrData.amount}</p>
            </div>
          </div>
        ) : (
          <p style={styles.loadingText}>Loading...</p>
        )}
        <button onClick={handleBack} style={styles.button}>Back</button>
      </div>
      <img
        style={styles.bottomImg}
        src="https://imatrivandrum.org/wp-content/uploads/2023/01/IMA-Trivandrum-payments.png"
        alt="IMA Trivandrum"
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#ffffff", // White background for a clean look
    fontFamily: "'Roboto', sans-serif",
    padding: "10px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4facfe", // Light blue background
    padding: "10px",
    borderRadius: "10px",
    gap: "10px",
  },
  upiLogo: {
    width: "50px",
    height: "50px",
    backgroundColor:"white"
  },
  upiName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: "1rem",
    marginTop: "10px",
  },
  loadingText: {
    fontSize: "1rem",
    color: "#333",
    marginTop: "20px",
  },
  qrContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  qrImage: {
    width: "200px",
    height: "200px",
    marginBottom: "20px",
  },
  details: {
    marginTop: "10px",
    fontSize: "1rem",
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4facfe",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%", // Full-width button for a better user experience
  },
  bottomImg: {
    width: "80%", // Adjusted size for mobile responsiveness
    marginTop: "40px",
  },
  '@media (max-width: 600px)': {
    qrImage: {
      width: "150px", // Smaller QR code for small screens
      height: "150px",
    },
    card: {
      maxWidth: "90%", // Increase card width on small screens
    },
    button: {
      padding: "10px 15px", // Slightly smaller button on mobile
    },
    bottomImg: {
      width: "90%", // Adjust image width on mobile
    },
  }
};

export default QRCodeDetails;
