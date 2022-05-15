import React, { useRef, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const successMessage = "Thank you, Your message sent successfully";
const errorMessage = "Sorry, something went wrong";

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const sid = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const tid = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const pk = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    toast
      .promise(emailjs.sendForm(sid, tid, formRef.current, pk), {
        pending: "Sending your message",
        success: "Thank you, Your message has been sent",
        error: "Sorry, Something went wrong",
      })
      .finally(() => setIsSending(false));

    // emailjs
    //   .sendForm(sid, tid, formRef.current, pk)
    //   .then((result) => {
    //     console.log(result);
    //     setError(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setError(true);
    //   })
    //   .finally(() => setIsSending(false));
  };
  return (
    <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="name-input">Your name</label>
      <input id="name-input" type="text" name="name" />
      <label htmlFor="email-input">Your email</label>
      <input id="email-input" type="email" name="email" />
      <label htmlFor="message-input">Your message</label>
      <textarea id="message-input" form="contact-form" name="message" />

      <button type="submit" name="send" disabled={isSending}>
        {isSending && <span className="spinner" />}
        {isSending ? "Sending..." : "Send"}
      </button>
      {error === false && (
        <label>
          <FaCheckCircle style={{ color: "#0f0" }} /> {successMessage}
        </label>
      )}
      {error === true && (
        <label>
          <FaTimesCircle style={{ color: "#f00" }} /> {errorMessage}
        </label>
      )}
    </form>
  );
};

export default ContactForm;
