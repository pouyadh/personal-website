import React from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
// Using formik and yup just for showcase, however it's not efficient and they are technical debts due to their huge bundle sizes for such a simple form!

import emailjs from "@emailjs/browser";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";

const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "form.validation.too_short")
    .max(50, "form.validation.too_long")
    .required("form.validation.required"),
  email: Yup.string()
    .email("form.validation.invalid_email")
    .required("form.validation.required"),
  message: Yup.string()
    .min(5, "form.validation.too_short")
    .max(500, "form.validation.too_long")
    .required("form.validation.required"),
});

const contactFormInitialValues = {
  name: "",
  email: "",
  message: "",
};

const CustomErrorMessage = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <motion.small
        className="error"
        animate={{ x: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.3 }}
      >
        <FaTimes style={{ color: "var(--color-error-icon)" }} />{" "}
        <FormattedMessage id={msg} />
      </motion.small>
    )}
  </ErrorMessage>
);

const handleSubmit = async (values) => {
  const sid = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const tid = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const pk = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  await toast.promise(emailjs.send(sid, tid, values, pk), {
    pending: {
      render() {
        return <FormattedMessage id="contact-form.submit.pending" />;
      },
    },
    success: {
      render() {
        return <FormattedMessage id="contact-form.submit.success" />;
      },
    },
    error: {
      render() {
        return <FormattedMessage id="contact-form.submit.error" />;
      },
    },
  });
};

const ContactForm = () => {
  const intl = useIntl();
  return (
    <Formik
      initialValues={contactFormInitialValues}
      validationSchema={contactFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form id="contact-form" autoComplete="off">
          <label htmlFor="name-input">
            <FormattedMessage id="contact-form.label.name" />
          </label>
          <Field
            id="name-input"
            type="text"
            name="name"
            placeholder={intl.formatMessage({
              id: "contact-form.placeholder.name",
            })}
          />
          <CustomErrorMessage name="name" />
          <label htmlFor="email-input">
            <FormattedMessage id="contact-form.label.email" />
          </label>
          <Field
            id="email-input"
            type="email"
            name="email"
            placeholder={intl.formatMessage({
              id: "contact-form.placeholder.email",
            })}
          />
          <CustomErrorMessage name="email" />
          <label htmlFor="message-input">
            <FormattedMessage id="contact-form.label.message" />
          </label>
          <Field
            as="textarea"
            id="message-input"
            form="contact-form"
            name="message"
            placeholder={intl.formatMessage({
              id: "contact-form.placeholder.message",
            })}
          />
          <CustomErrorMessage name="message" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && <span className="spinner" />}
            {isSubmitting ? (
              <FormattedMessage id="contact-form.button.submitting" />
            ) : (
              <FormattedMessage id="contact-form.button.submit" />
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
