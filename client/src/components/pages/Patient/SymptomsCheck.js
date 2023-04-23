import "../../styles/components.scss";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useContext,useEffect, useRef } from "react";
import AuthContext from "../../context/authContext";
import patientPortal from "../../assets/symp1.png";
import Spinner from "../../elements/Spinner";
import { GET_PATIENT } from "../../../queries/patientQueries";
import AlertMessage from "../../sections/alertMessage";
import { UPDATE_PATIENT_SYMPTOMS } from "../../../mutations/patientMutations";
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import dataset from "../../elements/data";

export default function SymptomsCheck() {
  const passage = dataset.dataset.join("\n");
  const [model, setModel] = useState(null);
  const [modelInit, setModelInit] = useState(false);
  const [answer, setAnswer] = useState();

  const authContext = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });
  const id = authContext.userId;
  const [fever, setFever] = useState(false);
  const [cough, setCough] = useState(false);
  const [shortnessOfBreath, setShortnessOfBreath] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [bodyAches, setBodyAches] = useState(false);
  const [headache, setHeadache] = useState(false);
  const [lossOfTaste, setLossOfTaste] = useState(false);
  const [lossOfSmell, setLossOfSmell] = useState(false);
  const [soreThroat, setSoreThroat] = useState(false);
  const [congestion, setCongestion] = useState(false);
  const [nausea, setNausea] = useState(false);
  const [diarrhea, setDiarrhea] = useState(false);
  const [updatePatient, { loading: updateLoading, error: updateError }] = useMutation(
      UPDATE_PATIENT_SYMPTOMS
  );

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded");
  };

  const answerQuestion = async (questionString) => {

    console.log("Question submitted.");
    const question = `What produces ${questionString} ?`;
    console.log("Question: " + question);
    const answers = await model.findAnswers(question, passage);
    setAnswer(answers);
    console.log(answers);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updatePatient({
      variables: {
        id: id,
          fever: fever,
          cough: cough,
          shortnessOfBreath: shortnessOfBreath,
          fatigue: fatigue,
          bodyAches: bodyAches,
          headache: headache,
          lossOfTaste: lossOfTaste,
          lossOfSmell: lossOfSmell,
          soreThroat: soreThroat,
          congestion: congestion,
          nausea: nausea,
          diarrhea: diarrhea,
      },
      refetchQueries: [
        {
          query: GET_PATIENT,
          variables: { id: authContext.userId },
        },
      ],
    });

   // AI
let question = "";

if (fever)
  question += "fever, ";
if (cough)
  question += "cough, ";
if (shortnessOfBreath)
  question += "shortness of breath, ";
if (fatigue)
  question += "fatigue, ";
if (bodyAches)
  question += "body aches, ";
if (headache)
  question += "headache, ";
if (lossOfTaste)
  question += "loss of taste, ";
if (lossOfSmell)
  question += "loss of smell, ";
if (soreThroat)
  question += "sore throat, ";
if (congestion)
  question += "congestion, ";
if (nausea)
  question += "nausea or vomiting, ";
if (diarrhea)
  question += "diarrhea, ";


    if(question.length > 0)
    {
      question = question.substring(0,question.length-2); // Remove the last ", "
      question+= "?";
      answerQuestion(question);
    }

  };
  useEffect(() => {

    if(modelInit === false)
    {
      setModelInit(true);
      loadModel();
    }

    if (!loading)
    {
      setFever(data.patient.fever);
      setCough(data.patient.cough);
      setShortnessOfBreath(data.patient.shortnessOfBreath);
      setFatigue(data.patient.fatigue);
      setBodyAches(data.patient.bodyAches);
      setHeadache(data.patient.headache);
      setLossOfTaste(data.patient.lossOfTaste);
      setLossOfSmell(data.patient.lossOfSmell);
      setSoreThroat(data.patient.soreThroat);
      setCongestion(data.patient.congestion);
      setNausea(data.patient.nausea);
      setDiarrhea(data.patient.diarrhea);
    }

  }, [loading]);

  if (loading) return <Spinner />;
  if(model == null) return <Spinner />;
  if (error) return <AlertMessage message={error.message} />;

  return (
    <div className="wrapper wp-bgw">
    <div className="patient-portal-content">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          
           
              <h2 className="text-center mb-4">Patient Symptoms</h2>
              <img
                src={patientPortal}
                alt="Patient Portal"
                className="img-fluid d-block mx-auto mb-4"
                style={{ width: '128px', height: '128px' }}
              />

              <form onSubmit={handleFormSubmit}>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="fever"
                    checked={fever}
                    onChange={(e) => setFever(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="fever">
                    Fever
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="cough"
                    checked={cough}
                    onChange={(e) => setCough(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="cough">
                    Cough
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="shortness-of-breath"
                    checked={shortnessOfBreath}
                    onChange={(e) => setShortnessOfBreath(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="shortness-of-breath"
                  >
                    Shortness of breath
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="fatigue"
                    checked={fatigue}
                    onChange={(e) => setFatigue(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="fatigue">
                    Fatigue
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="body-aches"
                    checked={bodyAches}
                    onChange={(e) => setBodyAches(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="body-aches">
                    Body aches
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="headache"
                    checked={headache}
                    onChange={(e) => setHeadache(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="headache">
                    Headache
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="lossOfTaste"
                    checked={lossOfTaste}
                    onChange={(e) => setLossOfTaste(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="lossOfTaste">
                    Loss of Taste
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="lossOfSmell"
                    checked={lossOfSmell}
                    onChange={(e) => setLossOfSmell(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="lossOfSmell">
                    Loss of Smell
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="soreThroat"
                    checked={soreThroat}
                    onChange={(e) => setSoreThroat(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="soreThroat">
                    Sore Throat
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="congestion"
                    checked={congestion}
                    onChange={(e) => setCongestion(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="congestion">
                    Congestion
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nausea"
                    checked={nausea}
                    onChange={(e) => setNausea(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="nausea">
                    Nausea or Vomiting
                  </label>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="diarrhea"
                    checked={diarrhea}
                    onChange={(e) => setDiarrhea(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="diarrhea">
                    Diarrhea
                  </label>
                </div>
                {updateLoading && <Spinner />}
                {updateError && <AlertMessage message={updateError.message} />}
                <div className="center mt-4">
                <button type="submit" className="btn btn-primary mt-3">
                  Save
                </button>
                </div>
              </form>

              <div className="motivational-tip">
                <h5>Possible Medical Conditions:</h5>
                {answer
                    ? answer.map((ans, idx) => (
                      <div className="answer" key={idx} style={{ color: "white" }}>
                          <b>Condition {idx + 1}: </b>
                          {ans.text}
                        </div>
                    ))
                    : ""}
              </div>
              </div>
            </div>
          </div>
        </div>
     
  );
}