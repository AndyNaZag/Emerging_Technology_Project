import React from "react";
import "../styles/components.scss";
import folder from "../assets/folder.png";
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import dataset from "../elements/data";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PATIENTS } from "../../queries/patientQueries";
import { UPDATE_PATIENT } from "../../mutations/patientMutations";
import Spinner from "../elements/Spinner";

export default function MedicalCondition() {
  const passage = dataset.dataset.join("\n");
  const { loading, error, data } = useQuery(GET_PATIENTS);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);
  const [id, setPatientId] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    variables: { id, alertMsg },
    onCompleted: () => {
      setAlertMsg("");
      return alert("Your alert was successfully sent");
    },
  });

  //AI model
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded");
  };

  useEffect(() => {
    loadModel();
  }, []);

  //Answer question
  const answerQuestion = async (e) => {
    console.log("AQ called");
    if (e.which === 13 && model !== null) {
      console.log("Question submitted.");
      const question = `What produces ${questionRef.current.value} ?`;
      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    }
  };

  //Send Alert Message
  const submitHandler = (e) => {
    e.preventDefault();
    if (alertMsg === "") {
      return alert("Please write an alert message");
    }
    updatePatient(id, alertMsg);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <>
      <section className="wrapper wp-bgw">
        <div className="dir-col center">
          <div className="dir-row">
            <img
              src={folder}
              alt="Patient List Logo"
              className="mr-2 logo-big"
            />
            <h1>Medical Condition</h1>
          </div>
          <div className="grid">
            {model == null ? (
              <div>
                <div>
                  <button aria-busy="true" className="btn btn-secondary">
                    Model Loading ...
                  </button>
                </div>
              </div>
            ) : (
              <Fragment>
                <section className="wrapper wp-bgw">
                  <div className="dir-col medical-condition">
                    <h5>Write the symptoms:</h5>
                    <input
                      ref={questionRef}
                      onKeyPress={answerQuestion}
                      size="80"
                      placeholder="Enter a question here."
                      className="form-control"
                    ></input>
                    <div className="dir-col">
                      {answer && <h5>Possible Medical Conditions:</h5>}
                      {answer
                        ? answer.map((ans, idx) => (
                            <div className="answer" key={idx}>
                              <b>Condition {idx + 1} = </b>
                              {ans.text}
                            </div>
                          ))
                        : questionRef.length > 0
                        ? "There wasn't any medical condition related to the symptoms. Please alert patient to visit a doctor."
                        : ""}
                    </div>
                  </div>
                  {answer && (
                    <form className="dir-col medical-condition-form">
                      <h5>Alert Patient to visit a doctor?</h5>
                      <div className="mb-3">
                        <label className="form-label">Select Patient</label>
                        {data && (
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={id}
                            onChange={(e) => setPatientId(e.target.value)}
                          >
                            <option value="">Select Patient ID</option>
                            {data.patients.map((patient) => (
                              <option key={patient.id} value={patient.id}>
                                {patient.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                      <div>
                        <label className="form-label">Alert Message</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter alert message here."
                          value={alertMsg}
                          onChange={(e) => setAlertMsg(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={submitHandler}
                      >
                        Alert
                      </button>
                    </form>
                  )}
                </section>
              </Fragment>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
