import React, { useState } from "react";
import Specifics from "./Specifics";

const JobCard = ({ info }) => {
  const [tab, setTab] = useState(0);
  const currentTimestampInSeconds = Date.now() / 1000;

  const timeDifferenceInSeconds =
    currentTimestampInSeconds - info.job_posted_at_timestamp;
  const timeLeftDifferenceInSeconds =
    info.job_offer_expiration_timestamp - currentTimestampInSeconds;
  const difInDays = Math.ceil(timeDifferenceInSeconds / 86400);
  const daysLeft = Math.ceil(timeLeftDifferenceInSeconds / 86400);

  return (
    <div className="card  p-5 bg-base-100 drop-shadow-2xl">
      <div className="card-body p-0">
        <div className="card-actions justify-between">
          <h6 className="font-bold">
            {" "}
            Title : {info.job_title}--{info.job_employment_type}--{difInDays}
            Days ago--{daysLeft}Days left
          </h6>
          <div>
            <a
              target="_blank"
              className="btn btn-xs mr-2"
              rel="noreferrer"
              href={info.job_apply_link}
            >
              {" "}
              Direct apply
            </a>
            <a
              target="_blank"
              className="btn btn-xs"
              rel="noreferrer"
              href={info.job_google_link}
            >
              {" "}
              Google Apply
            </a>
          </div>
        </div>
        <p className="text-start">
          Company : <strong> {info.employer_name} </strong>{" "}
          <a target="_blank" rel="noreferrer" href={info.employer_website}>
            website
          </a>
        </p>
        <p className="text-start">
          Location :{info.job_city}, <strong> {info.job_country} </strong>
        </p>
        {/* <small>{info.job_description ?? "No data provided"}</small> */}
        <div className="tabs">
          <a
            className={`tab tab-lifted ${tab === 0 && "tab-active"}`}
            onClick={() => setTab(0)}
          >
            Description
          </a>
          <a
            className={`tab tab-lifted ${tab === 1 && "tab-active"}`}
            onClick={() => setTab(1)}
          >
            Qualifications
          </a>
          <a
            className={`tab tab-lifted ${tab === 2 && "tab-active"}`}
            onClick={() => setTab(2)}
          >
            Responsibilities
          </a>
        </div>
        {tab === 0 ? (
          <p>{info.job_description ?? "No data provided"}</p>
        ) : tab === 1 ? (
          <Specifics points={info.job_highlights?.Qualifications ?? ["N/A"]} />
        ) : (
          <Specifics
            points={info.job_highlights?.Responsibilities ?? ["N/A"]}
          />
        )}
      </div>
    </div>
  );
};

export default JobCard;
