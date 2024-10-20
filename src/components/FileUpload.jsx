// src/FileUpload.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import ReligionType from './ReligionType';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

// Import the marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [position, setPosition] = useState([ 19.120128, 72.9088]); // Default position (Mumbai)
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null); // State to store the selected location
    const [religionInfo, setReligionInfo] = useState(null); // State to store religion info
    const [pincodeData, setPincodeData] = useState([]); // State to store all pincode data
    const navigate = useNavigate();


  // Replace with your Gemini API key
  // const geminiApiKey = 'AIzaSyCLVFGlzlD38y9oiMSlKCm1hUuA-Ln_RT8';
  useEffect(() => {
    const loadPincodeData = async () => {
      const csvFilePath = `../../public/religion_info.csv`;

      // Fetch and parse the CSV data
      const csvData = await fetch(csvFilePath)
        .then((res) => res.text())
        .then((data) => Papa.parse(data, { header: true }).data);

      // Convert pincode data into an array with coordinates (assuming some coordinates are given)
      const pincodeWithCoords = csvData.map((entry) => ({
        Pincode: entry.Pincode,
        Primary_Religion: entry.Primary_Religion,
        Secondary_Religion: entry.Secondary_Religion,
        Primary_percentage: entry.Primary_per,
        Secondary_percentage: entry.Secondary_per,
        Percentage: entry.Percentage,
        // Add latitude and longitude as needed, or retrieve from a separate source
        // Here we're assuming you have some latitude and longitude associated with each pincode
        lat: parseFloat(entry.lat), // replace with actual lat field from CSV
        lng: parseFloat(entry.lng), // replace with actual lng field from CSV
      }));

      // console.log(pincodeWithCoords);

      setPincodeData(pincodeWithCoords);
    };

    loadPincodeData();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Get user's current location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setError("Unable to retrieve your location");
      }
    );
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]); // Send only the first file for now

    try {
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data);
        setError(null);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Error uploading file.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            setError("An unknown error occurred.");
            break;
          default:
            setError("Unable to retrieve your location.");
        }
      }
    );
  };

  const handleSetSelectedLocation = async () => {
    if (selectedLocation) {
      try {
        // Extract coordinates from the selected location
        const { lat, lng } = selectedLocation;

        // Find the closest pincode
        let closestPincode = null;
        let closestDistance = Infinity;

        pincodeData.forEach((entry) => {
          // Ensure lat and lng are defined before calculating
          if (!entry.lat || !entry.lng) {
            console.warn(`Entry missing lat or lng: ${entry}`);
            return; // Skip this entry if lat/lng are not defined
          }

          const distance = calculateDistance(lat, lng, entry.lat, entry.lng);
          console.log(`Distance to pincode ${entry.Pincode}: ${distance} km`);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestPincode = entry.Pincode; // Store closest pincode
          }
        });

        console.log(
          `Closest pincode found: ${closestPincode} at distance ${closestDistance} km`
        );

        // Find religion info based on closest pincode
        const religionInfo = pincodeData.find(
          (entry) => entry.Pincode === closestPincode
        );

        console.log(religionInfo);

        if (religionInfo) {
          setReligionInfo(religionInfo); // Store the fetched religion info
          localStorage.setItem("religion", religionInfo);
          setResponse({ ...response, selectedLocation }); // Update response with selected location

          // Optional: Log to indicate the action
          console.log("Religion information updated:", religionInfo);
        } else {
          setError("No religion data found for the closest pincode.");
        }
      } catch (err) {
        setError("Network error: " + err.message);
      }
    } else {
      setError("Please select a location on the map.");
    }
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]); // Update position on map click
        setSelectedLocation({ lat: e.latlng.lat, lng: e.latlng.lng }); // Store selected location
      },
    });

        return position === null ? null : (
            <Marker position={position} icon={L.icon({ iconUrl: markerIcon })} />
        );
    };

    const handleNext = (e) =>{
        e.preventDefault()
        navigate('/info');
    }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-teal-300" : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="flex justify-between items-center p-5 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold">Upload and Process CSV</h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-md ${
            isDarkMode ? "bg-purple-600" : "bg-blue-500"
          } text-white`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 p-10">
        {/* Left Section (File Upload + Buttons) */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div className="bg-white shadow-lg p-6 rounded-md">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="p-3 border rounded-md w-full"
            />
            <button
              onClick={handleUpload}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md w-full mt-4 transition"
            >
              Upload CSV
            </button>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-md">
            <button
              onClick={handleGetCurrentLocation}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md w-full transition"
            >
              Get Current Location
            </button>
            <button
              onClick={handleSetSelectedLocation}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md w-full mt-4 transition"
            >
              Set Selected Location
            </button>

            {currentLocation && (
              <p className="mt-4 text-gray-800">
                Current Location: {currentLocation.latitude},{" "}
                {currentLocation.longitude}
              </p>
            )}

            {selectedLocation && (
              <div className="mt-4 p-4 bg-blue-100 text-blue-900 rounded-md">
                <h2 className="font-semibold">Selected Location:</h2>
                <p>
                  Latitude: {selectedLocation.lat}, Longitude:{" "}
                  {selectedLocation.lng}
                </p>
                {/* <p>Religion Information : {religionInfo.religion}</p> */}
              </div>
            )}

            {religionInfo && (
              <div className="mt-4 p-4 bg-yellow-100 text-yellow-900 rounded-md">
                <h2 className="font-semibold">Religion Information:</h2>
                <pre>{JSON.stringify(religionInfo, null, 2)}</pre>
              </div>
            )}

            {response && (
              <div className="mt-4 p-4 bg-green-100 text-green-900 rounded-md">
                <h2 className="font-semibold">Response:</h2>
                <pre>{JSON.stringify(response, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Section (Map + Religion Type Form) */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full h-96 bg-white shadow-lg rounded-md">
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>

                    <div className="bg-white shadow-lg p-6 rounded-md">
                        <ReligionType religionInfo={religionInfo} /> {/* Pass religionInfo as a prop */}
                    </div>

                </div>
            </main>

            <div className="flex justify-center">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md w-[200px] transition"
                    onClick={e => handleNext(e)}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default FileUpload;
