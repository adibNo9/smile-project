import { useState } from "react";

import axios from "axios";
import cls from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { AngryFaceIcon } from "../../assets/icons/angry-face-icon";
import { FormHeaderBackground } from "../../assets/icons/form-header-background";
import { HappyFaceIcon } from "../../assets/icons/happy-face-icon";
import { PokerFaceIcon } from "../../assets/icons/poker-face-icon";
import { useTransition } from "../../contexts/useTranslation";
import { useUserId } from "../../contexts/useUserId";
import styles from "./styles.module.css";
import { enTexts, faTexts } from "./texts";

interface LoginFormValues {
  name: string;
  email: string;
  feedback: string;
  feedbackMessage: string;
}

interface FormResponse {
  result: string;
  status: string;
}

const initialValues: LoginFormValues = {
  name: "",
  email: "",
  feedback: "",
  feedbackMessage: "",
};

const FinalForm = () => {
  const { locale } = useTransition();
  const texts = locale === "en" ? enTexts : faTexts;
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const { userId } = useUserId();

  const FinalFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, texts.tooShort)
      .max(50, texts.tooLong)
      .required(texts.required),
    feedback: Yup.string().min(2, texts.tooShort).max(50, texts.tooLong),
    email: Yup.string().email(texts.invalidEmail),
    feedbackMessage: Yup.string().max(250, texts.tooLong),
  });

  const postSurvey = async (rank: number, userId?: number) => {
    try {
      await axios
        .post<FormResponse>("/saverank", {
          rank: rank,
          id: userId,
        })
        .then((response) => {
          if (response.data.status === "200") {
            console.log(response.data.result);
          } else {
            console.log(response.data.result);
          }
        })
        .catch((error) => console.log(error));
      console.log("Image sent to server.");
    } catch (error) {
      console.error("Error sending image to server:", error);
    }
  };

  const postForm = async (values: LoginFormValues, userId?: number) => {
    try {
      await axios
        .post<FormResponse>("/savecomment", {
          name: values.name,
          email: values.email,
          comment: values.feedbackMessage,
          id: userId,
        })
        .then((response) => {
          if (response.data.status === "200") {
            console.log(response.data.result);
          } else {
            console.log(response.data.result);
          }
        })
        .catch((error) => console.log(error));
      console.log("Image sent to server.");
    } catch (error) {
      console.error("Error sending image to server:", error);
    }
  };

  const handleBoxClick = (boxNumber: number) => {
    if (selectedBox) {
      // If the clicked box is already selected, deselect it
      return;
    } else {
      // Otherwise, select the clicked box
      setSelectedBox(boxNumber);
      postSurvey(boxNumber, userId);
    }
  };

  const handleSubmit = (values: LoginFormValues) => {
    postForm(values, userId);
  };

  const FieldWrapper = cls({
    "field-wrapper-en": locale === "en",
    "field-wrapper-fa": locale === "fa",
  });

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-header"]}>
        <FormHeaderBackground className={styles["form-header-svg"]} />
        <h1>{texts.title}</h1>
      </div>
      <div className={styles["form-wrapper"]}>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={FinalFormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid }) => (
            <Form noValidate>
              <div className={styles[FieldWrapper]}>
                <Field
                  autoComplete="off"
                  type="text"
                  placeholder={texts.name}
                  id="name"
                  name="name"
                  className={cls(
                    styles[
                      cls({
                        error: errors.name && touched.name,
                      })
                    ],
                    styles[FieldWrapper]
                  )}
                />
                <ErrorMessage component="span" name="name" />
              </div>

              <div className={styles[FieldWrapper]}>
                <Field
                  autoComplete="off"
                  type="email"
                  placeholder={texts.email}
                  id="email"
                  name="email"
                  className={cls(
                    styles[FieldWrapper],
                    styles[
                      cls({
                        error: errors.email && touched.email,
                      })
                    ]
                  )}
                />
                <ErrorMessage component="span" name="email" />
              </div>

              <div className={styles[FieldWrapper]}>
                <Field
                  autoComplete="off"
                  type="text"
                  placeholder={texts.feedback}
                  id="feedback"
                  name="feedback"
                  className={cls(
                    styles[FieldWrapper],
                    styles[
                      cls({
                        error: errors.feedback && touched.feedback,
                      })
                    ]
                  )}
                />
                <ErrorMessage component="span" name="feedback" />
              </div>

              <Field
                as="textarea"
                id="feedback-message"
                name="feedbackMessage"
                rows={4}
                placeholder={texts.textarea}
                autoComplete="off"
                className={styles[FieldWrapper]}
              />

              <button type="submit" disabled={!isValid}>
                {texts.submit}
              </button>
            </Form>
          )}
        </Formik>

        <div className={styles["survey-wrapper"]}>
          <div
            onClick={() => handleBoxClick(1)}
            className={cls(
              styles["survey-item"],
              styles[cls({ selected: selectedBox === 1 })],
              styles[cls({ disabled: !!selectedBox })]
            )}
          >
            <AngryFaceIcon />
          </div>
          <div
            onClick={() => handleBoxClick(2)}
            className={cls(
              styles["survey-item"],
              styles[cls({ selected: selectedBox === 2 })],
              styles[cls({ disabled: !!selectedBox })]
            )}
          >
            <PokerFaceIcon />
          </div>
          <div
            onClick={() => handleBoxClick(3)}
            className={cls(
              styles["survey-item"],
              styles[cls({ selected: selectedBox === 3 })],
              styles[cls({ disabled: !!selectedBox })]
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
