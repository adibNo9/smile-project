import { useState } from "react";

import cls from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { AngryFaceIcon } from "../../assets/icons/angry-face-icon";
import { HappyFaceIcon } from "../../assets/icons/happy-face-icon";
import { PokerFaceIcon } from "../../assets/icons/poker-face-icon";
import styles from "./styles.module.css";

interface LoginFormValues {
  name: string;
  email: string;
  feedback: string;
  feedbackMessage: string;
}

const initialValues: LoginFormValues = {
  name: "",
  email: "",
  feedback: "",
  feedbackMessage: "",
};

const FinalFormSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  feedback: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email("Invalid email"),
  feedbackMessage: Yup.string().max(250, "Too Long!"),
});

const FinalForm = () => {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const handleBoxClick = (boxNumber: number) => {
    if (selectedBox === boxNumber) {
      // If the clicked box is already selected, deselect it
      setSelectedBox(null);
    } else {
      // Otherwise, select the clicked box
      setSelectedBox(boxNumber);
    }
  };

  const handleSubmit = (values: LoginFormValues) => {
    // Handle form submission logic here
    console.log(values);
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-header"]}>
        <h1>Are you happy with our service ?</h1>
      </div>
      <div className={styles["form-wrapper"]}>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={FinalFormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form noValidate>
              <div className={styles["field-wrapper"]}>
                <Field
                  autoComplete="off"
                  type="text"
                  placeholder="Name"
                  id="name"
                  name="name"
                  className={
                    styles[cls({ error: errors.name && touched.name })]
                  }
                />
                <ErrorMessage component="span" name="name" />
              </div>

              <div className={styles["field-wrapper"]}>
                <Field
                  autoComplete="off"
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  className={
                    styles[cls({ error: errors.email && touched.email })]
                  }
                />
                <ErrorMessage component="span" name="email" />
              </div>

              <div className={styles["field-wrapper"]}>
                <Field
                  autoComplete="off"
                  type="text"
                  placeholder="Give Feedback"
                  id="feedback"
                  name="feedback"
                  className={
                    styles[
                      cls({
                        error: errors.feedback && touched.feedback,
                      })
                    ]
                  }
                />
                <ErrorMessage component="span" name="feedback" />
              </div>

              <Field
                as="textarea"
                id="feedback-message"
                name="feedbackMessage"
                rows={4}
                placeholder="Tell us how we can improve"
                autoComplete="off"
              />

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>

        <div className={styles["survey-wrapper"]}>
          <div
            onClick={() => handleBoxClick(1)}
            className={cls(
              styles["survey-item"],
              styles[cls({ selected: selectedBox === 1 })],
            )}
          >
            <AngryFaceIcon />
          </div>
          <div
            onClick={() => handleBoxClick(2)}
            className={cls(
              styles["survey-item"],
              styles[cls({ selected: selectedBox === 2 })],
            )}
          >
            <PokerFaceIcon />
          </div>
          <div
            onClick={() => handleBoxClick(3)}
            className={cls(
              styles["survey-item"],
              styles[cls({ selected: selectedBox === 3 })],
            )}
          >
            <HappyFaceIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalForm;
