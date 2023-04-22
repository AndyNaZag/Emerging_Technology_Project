import "../../styles/components.scss";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useContext,useEffect } from "react";
import AuthContext from "../../context/authContext";
import patientPortal from "../../assets/patient-portal.png";
import Spinner from "../../elements/Spinner";
import { GET_PATIENT } from "../../../queries/patientQueries";
import AlertMessage from "../../sections/alertMessage";
import { UPDATE_PATIENT } from "../../../mutations/patientMutations";

export default function SymptomsCheck() {
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
    UPDATE_PATIENT
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updatePatient({
      variables: {
        id: id,
        symptomsInput: {
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
      },
      refetchQueries: [
        {
          query: GET_PATIENT,
          variables: { id: authContext.userId },
        },
      ],
    });
  };
  useEffect(() => {
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
  if (error) return <AlertMessage message={error.message} />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
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
                <button type="submit" className="btn btn-primary mt-3">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}