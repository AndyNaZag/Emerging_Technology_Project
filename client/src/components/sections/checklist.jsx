import "../styles/components.scss";
import list from "../assets/list.png";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_ALERT } from "../../mutations/alertMutations";
import { UPDATE_PATIENT } from "../../mutations/patientMutations";
import { set } from "mongoose";

export default function Checklist({ id }) {
  const [page, setPage] = useState(0);
  const [fever, setFever] = useState(false);
  const [chestPain, setChestPain] = useState(false);
  const [difficultyBreathing, setBreathing] = useState(false);
  const [symptoms, setSymptoms] = useState("");

  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    variables: {
      id,
      fever,
      chestPain,
      difficultyBreathing,
      symptoms,
    },
    onCompleted: () => {
      return alert("Your information was successfully submitted");
    },
  });

  const nextPage = () => {
    setPage(page + 1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!fever && !chestPain && !difficultyBreathing && !symptoms) {
      return alert("Please select or describe at least one symptom");
    }
    updatePatient(id, fever, chestPain, difficultyBreathing, symptoms);
    setFever(false);
    setChestPain(false);
    setBreathing(false);
    setSymptoms("");
    setPage(0);
  };

  return (
    <>
      <div className="dir-col">
        <button data-bs-toggle="modal" data-bs-target="#symptomsChecklist">
          <div className="dir-row">
            {/* <img src={list} alt="Patient List Logo" className="mr-2 logo-big" /> */}
            <h5>SIGN AND SYMPTOMS CHECKLIST</h5>
          </div>

          <p className="op-s">
            Keep in touch with your healthcare practitioner. Update us with your
            latest sign and symptoms.
          </p>
        </button>
      </div>
      <div
        className="modal fade"
        id="symptomsChecklist"
        aria-labelledby="symptomsChecklistLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="symptomsChecklistLabel">
                <img
                  src={list}
                  alt="Patient List Logo"
                  className="mr-2 logo-big"
                />
                Sign and Symptoms Checklist
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                {page < 1 && (
                  <div className="mb-3 dir-col">
                    <label className="form-label">
                      1. Are you currently experiencing any of these symptoms?
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={fever}
                        onChange={(e) => setFever(e.target.checked)}
                      />
                      <label className="form-check-label">
                        Fever or chills
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={chestPain}
                        onChange={(e) => setChestPain(e.target.checked)}
                      />
                      <label className="form-check-label">
                        Severe chest pain
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={difficultyBreathing}
                        onChange={(e) => setBreathing(e.target.checked)}
                      />
                      <label className="form-check-label">
                        Diffculty breathing
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={nextPage}
                    >
                      Next
                    </button>
                  </div>
                )}
                {page >= 1 && (
                  <div className="mb-3 dir-col">
                    <label className="form-label">
                      2. Describe any other symptoms you have had in the last
                      week:
                    </label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      className="form-control"
                      placeholder="Describe your emergency here ..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    ></textarea>
                    <div className="dir-row">
                      <button
                        onClick={() => setPage(page - 1)}
                        className="btn btn-secondary"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-primary"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
