"use client";
import { useState } from "react";

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission - sends data to API endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      // Send POST request to API with form data as JSON
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Check if submission was successful based on API response
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Main form container with styling and submit handler */}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-full w-full mx-auto mb-8 space-y-6 backdrop-blur-sm"
      >
        {/* Success message - only shown when status is "success" */}
        {status === "success" && (
          <div className="text-green-700 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            {/* Green checkmark icon */}
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">
              Form submitted successfully! Thank you for your message.
            </span>
          </div>
        )}

        {/* Error message - only shown when status is "error" */}
        {status === "error" && (
          <div className="text-red-700 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-medium">
              Failed to submit form. Please try again later.
            </span>
          </div>
        )}

        {/* Name input field with label and icon */}
        <div className="space-y-2 group">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
          >
            Name
          </label>
          <div className="relative">
            {/* Name input field */}
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-4 pl-5 border border-gray-200 rounded-xl text-base bg-gray-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white focus:border-emerald-300 focus:shadow-lg focus:shadow-emerald-400/10 group-hover:border-gray-300"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            {/* User icon in the input*/}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Email input field with label and icon */}
        <div className="space-y-2 group">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
          >
            Email
          </label>
          <div className="relative">
            {/* Email input field */}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full p-4 pl-5 border border-gray-200 rounded-xl text-base bg-gray-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white focus:border-emerald-300 focus:shadow-lg focus:shadow-emerald-400/10 group-hover:border-gray-300"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            {/* Email icon in the input*/}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message textarea field with label and icon */}
        <div className="space-y-2 group">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
          >
            Message
          </label>
          <div className="relative">
            {/* Message textarea field */}
            <textarea
              id="message"
              name="message"
              placeholder="Write a message.."
              rows={5}
              className="w-full p-4 pl-5 pr-12 border border-gray-200 rounded-xl text-base bg-gray-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white focus:border-emerald-300 focus:shadow-lg focus:shadow-emerald-400/10 resize-none group-hover:border-gray-300"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            {/* Message icon in the textarea*/}
            <div className="absolute top-4 right-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit button with loading state and animations */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-500 text-white font-bold rounded-xl px-8 py-4 text-lg mt-6 shadow-lg transition-all duration-300 hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-600 hover:shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:from-emerald-600 disabled:hover:via-emerald-500 disabled:hover:to-emerald-500 disabled:hover:scale-100 relative overflow-hidden"
        >
          {/* Button content container */}
          <div className="relative flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                {/* Loading spinner icon - only shown while submitting */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {/* Loading text */}
                <span>Submitting...</span>
              </>
            ) : (
              <>
                {/* Default button text - shown when not submitting */}
                <span>Send Message</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};
