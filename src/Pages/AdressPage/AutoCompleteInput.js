import React, { useState } from "react";
import PropTypes from "prop-types";
import getPlaces from "./getplaces";
import { Form } from "react-bootstrap";

AutoCompleteInput.propTypes = {
  handleManualInputChange: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  streetAndNumber: PropTypes.string.isRequired,
};

const autoCompleteInputContainerStyle = {
  position: "relative",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "25px",
  fontSize:'1.1rem'
};

const suggestionsStyle = {
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  zIndex: 1,
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const suggestionItemStyle = {
  padding: "8px",
  cursor: "pointer",
};

export default function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    handleManualInputChange(event, "streetAndNumber");
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query) => {
    const suggestions = await getPlaces(query);
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    const streetAndNumber = suggestion.place_name.split(",")[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address = {
      streetAndNumber,
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split(".")[0];
      address[identifier] = element.text;
    });

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div style={autoCompleteInputContainerStyle}>
      <Form.Control
        id="address"
        type="text"
        placeholder="Apartment and Street"
        value={streetAndNumber}
        onChange={handleChange}
        style={inputStyle}
      />
      {suggestions.length > 0 && (
        <ul style={suggestionsStyle}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={suggestionItemStyle}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
