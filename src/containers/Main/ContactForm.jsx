import React from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
// Using formik and yup just for showcase, however it's not efficient and they are technical debts due to their huge bundle sizes for such a simple form!

import emailjs from "@emailjs/browser";

const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string()
    .min(5, "Too Short")
    .max(500, "Too Long")
    .required("Required"),
});

const contactFormInitialValues = {
  name: "",
  email: "",
  message: "",
};

const CustomErrorMessage = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <span className="error">
        <FaTimes style={{ color: "#f00" }} /> {msg}
      </span>
    )}
  </ErrorMessage>
);

const handleSubmit = async (values) => {
  const sid = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const tid = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const pk = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  await toast.promise(emailjs.send(sid, tid, values, pk), {
    pending: "Sending your message",
    success: "Thank you, Your message has been sent",
    error: "Sorry, Something went wrong",
  });
};

const ContactForm = () => {
  return (
    <Formik
      initialValues={contactFormInitialValues}
      validationSchema={contactFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form id="contact-form">
          <label htmlFor="name-input">Your name</label>
          <Field id="name-input" type="text" name="name" />
          <CustomErrorMessage name="name" />
          <label htmlFor="email-input">Your email</label>
          <Field id="email-input" type="email" name="email" />
          <CustomErrorMessage name="email" />
          <label htmlFor="message-input">Your message</label>
          <Field
            as="textarea"
            id="message-input"
            form="contact-form"
            name="message"
          />
          <CustomErrorMessage name="message" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && <span className="spinner" />}
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
