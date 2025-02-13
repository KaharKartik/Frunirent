import React, { useState } from "react";

import ChatBot from "react-chatbotify";

function Bot() {
  const config = {
    botName: "FurnitureRentBot",
  };
  const [form, setForm] = useState({});
  const items = ["View Furniture", "Rental Period", "Inquire"];
  const furniture_items = ["Sofa", "Table", "Chair"];
  const period_items = ["1 week", "1 month", "3 months"];

  const flow = {
    start: {
      message: "Welcome to FurnitureRent! What is your name?",
      path: "get_name",
    },
    get_name: {
      message: (params) => {
        setForm((prevForm) => ({ ...prevForm, name: params.userInput }));
        return "Hello ${params.userInput}! How can I assist you today? Please select an option below.";
      },
      options: items,
      chatDisabled: true,
      path: "process_options",
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        switch (params.userInput) {
          case "View Furniture":
            return "view_furniture";
          case "Rental Period":
            return "rental_period";
          case "Inquire":
            return "get_age";
          default:
            return "unknown_input";
        }
      },
    },
    unknown_input: {
      message: "I'm sorry, I didn't understand that. Please select from the available options.",
      path: "process_options",
    },
    view_furniture: {
      message: "Here are the available furniture items:",
      options: furniture_items,
      chatDisabled: true,
      path: "furniture_details",
    },
    furniture_details: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        switch (params.userInput) {
          case "Sofa":
            return "sofa_details";
          case "Table":
            return "table_details";
          case "Chair":
            return "chair_details";
          default:
            return "unknown_input";
        }
      },
    },
    sofa_details: {
      message: "The sofa is available for rent at $50 per week. Would you like to rent it?",
      options: ["Yes", "No"],
      chatDisabled: true,
      path: "confirm_rent",
    },
    table_details: {
      message: "The table is available for rent at $30 per week. Would you like to rent it?",
      options: ["Yes", "No"],
      chatDisabled: true,
      path: "confirm_rent",
    },
    chair_details: {
      message: "The chair is available for rent at $15 per week. Would you like to rent it?",
      options: ["Yes", "No"],
      chatDisabled: true,
      path: "confirm_rent",
    },
    confirm_rent: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        if (params.userInput === "Yes") {
          return "rental_period";
        } else {
          return "process_options";
        }
      },
    },
    rental_period: {
      message: "Please select the rental period:",
      options: period_items,
      chatDisabled: true,
      path: "period_selected",
    },
    period_selected: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        setForm((prevForm) => ({ ...prevForm, rental_period: params.userInput }));
        return "get_payment_details";
      },
    },
    get_payment_details: {
      message: "Please enter your payment details:",
      path: async (params) => {
        setForm((prevForm) => ({ ...prevForm, payment_details: params.userInput }));
        return "rental_confirmation";
      },
    },
    rental_confirmation: {
      message: (params) => {
        const { name, rental_period, payment_details } = form;
        return `Thank you, ${name}! Your rental for ${rental_period} has been confirmed. Payment details: ${payment_details}`;
      },
      path: "end",
    },
    get_age: {
      message: "Please enter your age:",
      path: async (params) => {
        if (isNaN(Number(params.userInput))) {
          await params.injectMessage("Age must be a number!");
          return "get_age";
        }
        setForm((prevForm) => ({ ...prevForm, age: params.userInput }));
        return "get_contact";
      },
    },
    get_contact: {
      message: "Please enter your contact number (10 digits):",
      path: async (params) => {
        const contactNumber = params.userInput;
        if (isNaN(Number(contactNumber)) || contactNumber.length !== 10) {
          await params.injectMessage("Contact number must be a 10-digit number!");
          return "get_contact";
        }
        setForm((prevForm) => ({ ...prevForm, contact_number: contactNumber }));
        return "get_inquiry_topic";
      },
    },
    get_inquiry_topic: {
      message: "Please enter your inquiry topic:",
      path: (params) => {
        setForm((prevForm) => ({ ...prevForm, inquiry_topic: params.userInput }));
        return "inquiry_confirmation";
      },
    },
    inquiry_confirmation: {
      message: (params) => {
        const { name, age, contact_number, inquiry_topic } = form;
        return `Thank you for your inquiry, ${name}! Here are your details:\n\nAge: ${age}\nContact Number: ${contact_number}\nInquiry Topic: ${inquiry_topic}`;
      },
      path: "end",
    },
    end: {
      message: "Thank you for using FurnitureRent! How can I assist you further?",
      options: items,
      chatDisabled: true,
      path: "process_options",
    },
  };

  return (
    <>
      <ChatBot config={config} flow={flow} />
    </>
  );
}

export default Bot;