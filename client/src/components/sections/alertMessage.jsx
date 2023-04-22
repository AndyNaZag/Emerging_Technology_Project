import React from "react";
import "../styles/components.scss";
import alertMsg from "../assets/alert-msg.png";
import alertMsgWhite from "../assets/alert-msg-white.png";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_ALERT } from "../../mutations/alertMutations";

export default function AlertMessage({ id }) {
  const [patientId, setPatientId] = useState(id);
  const [message, setMessage] = useState("");

  const [createAlertMsg] = useMutation(CREATE_ALERT, {
    variables: { patientId, message },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      return alert("Please enter a description of your emergency");
    }
    createAlertMsg(patientId, message);
    setMessage("");
  };

  return (
    <>
      <div className="dir-col">
        <button data-bs-toggle="modal" data-bs-target="#createAlertMsg">
          <img
            src={alertMsg}
            alt="Patient List Logo"
            className="mr-2 logo-big"
          />
          <h5>SEND EMERGENCY ALERT</h5>
          <p className="op-s">
            Create and send an emergency alert to first responders. A nurse will
            contact you as soon as we receive your message, we work 24/7 because
            your health is our priority.
          </p>
        </button>
      </div>
      <div
        className="modal fade"
        id="createAlertMsg"
        aria-labelledby="createAlertMsgLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createAlertMsgLabel">
                <img
                  src={alertMsgWhite}
                  alt="Patient List Logo"
                  className="mr-2 logo-big"
                />
                Send Emergency Alert
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
                <div className="mb-3 dir-col">
                  <label className="form-label">Description:</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="form-control"
                    placeholder="Describe your emergency here ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
