import React, { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import JobCard from "./JobCard";
import SearchBox from "../SearchBox";
import axios from "axios";
import { getApiKey } from "../../api.js/api";

const Jobs = () => {
  //   const router = useRouter();
  const [keyIdx, setKeyIdx] = useState(0);
  const [searchTx, setSearchTx] = useState("React developer");
  const [page, setPage] = useState(1);
  const [searchRes, setSearchResult] = useState([]);
  const [srchLoader, setSearchLoader] = useState(false);
  // const [testData, setTestData] = useState([
  //   {
  //     employer_company_type: null,
  //     employer_logo: null,
  //     employer_name: "Goli Tech",
  //     employer_website: null,
  //     job_apply_is_direct: true,
  //     job_apply_link:
  //       "https://www.ziprecruiter.com/c/Goli-Tech/Job/React-Developer/-in-Charlotte,NC?jid=dee8f53deb990ad5",
  //     job_apply_quality_score: 0.5706,
  //     job_benefits: null,
  //     job_city: "Charlotte",
  //     job_country: "US",
  //     job_description:
  //       "Charlotte Mecklenburg Police Department is in need of a current temporary position to be filled. Please find the information on the position attached along with the contact information and other details below.\n• Job Description: CMPD React Developer\n• Location: Hybrid- remote and 601 East Trade St. Charlotte NC 28202 (CMPD Headquarters)\n• Start Date: As soon as possible until 06/30/2024 (2080 hours approximately)\n• Hiring Contact: Trivonna Nance: TJ.Nance@charlottenc.gov\n• POSTING DATE: 05/01/2023 UNTIL: 05/09/2023\n\nGeneral Summary:\n\nThe candidate works with the requesting department to develop software applications. The candidate should have good experience translating customer requirements into working designs and code. The candidate collaborates heavily with the development team, Business Analysts, UX/UI, and Quality Assurance team. The candidate participates in all stages of the Agile development cycle. The candidate should have experience with React hook framework as well as function-based components.\n\nResponsibilities:\n• Actively participates in Agile planning, development, and testing processes.\n• Accurately estimates tasks and assignments.\n• Collaborates with project team to design and develop application features.\n• Develop front-end application content.\n• Develop and maintain the back-end components of application such as servers, databases, and APIs.\n• Troubleshooting and debugging application to identify and resolve technical issues.\n• Ensuring that the application meets industry standards and best practices.\n\nEducation:\n• Bachelor's degree in Computer Science or demonstrated equivalent experience.\n\nTechnical Skills\n• React JS, HTML5, SCSS, CSS3, JSON, JavaScript,Node.js, Axios\n• Development tools: VS Code or other modern IDE\n• Debugging tools: Firebug, Chrome Developer Tools, or other browser or IDE based tools\n• Frameworks: React JS (v16 or higher), Node.js.\n• Servers: Apache HTTP Web Server (or other HTTP Server)\n• Platforms: Windows, Linux,\n• Methodologies: Agile, Waterfall\n• Database : Oracle or other relation database\n• Programming Languages : JavaScript, Java, Oracle PL/SQL (Java and PL/SQL are a plus but not required)\n• Content Management: git\n\nProfessional Experience\n• Design, develop and test applications using React that meet accessibility and web browser standards for website.\n• At least 1 year of full project lifecycle experience with function based React components.\n• Experience with features such as hooks and context.\n• Experience with modern JavaScript features.\n• Experience with React state management. Such as using packages like Recoil, Context, or Redux.\n• Experience with error handling methods in React environment.\n• Experience configuring React application environments. Such as App Server .configuration, Application configuration files such as package.json .\n• Experience using libraries such as Axios or Fetch to make asynchronous HTTP requests.\n• Experience using unit testing tools for React.\n• Design CSS templates ( Background, positioning, text, border, margin, padding, and table).\n• Apply optimization techniques to reduce page size and load times.\n• Experience developing single page applications (SPA).\n• Work with React functional components, Forms, Events, Keys, Router.\n• Familiar with services (RESTful) for transmission of large blocks JSON.\n• Familiar with React component libraries such Prime React.\n• Use Restful web services calls for POST, PUT, DELETE and GET methods.\n• Work with unit test frameworks to write unit tests for JavaScript code.\n• Use debugging tools such as Firebug and Chrome Developer Tools.\n• Interact with Testing Team, and Business Analysts for fixing of Issues.\n• Perform System Testing, Regression Testing for Complete UI after fixing Issues which are reported by Testing Team.\n\nRequired Skills : React,Javascript\nBasic Qualification :\nAdditional Skills : Software Developer",
  //     job_employment_type: "TEMPORARY",
  //     job_experience_in_place_of_education: false,
  //     job_google_link:
  //       "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer&start=0&ltype=1&chips=date_posted:week,requirements:years3under&schips=date_posted;week,requirements;years3under&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer&htidocid=NGy3DGydpT8AAAAAAAAAAA%3D%3D",
  //     job_highlights: {
  //       Qualifications: Array(30),
  //       Responsibilities: Array(12),
  //     },
  //     job_id: "NGy3DGydpT8AAAAAAAAAAA==",
  //     job_is_remote: true,
  //     job_job_title: null,
  //     job_latitude: 35.227085,
  //     job_longitude: -80.843124,
  //     job_max_salary: null,
  //     job_min_salary: null,
  //     job_offer_expiration_datetime_utc: "2023-06-01T00:00:00.000Z",
  //     job_offer_expiration_timestamp: 1685577600,
  //     job_onet_job_zone: "3",
  //     job_onet_soc: "15113400",
  //     job_posted_at_datetime_utc: "2023-05-02T15:37:00.000Z",
  //     job_posted_at_timestamp: 1683041820,
  //     job_posting_language: "en",
  //     job_publisher: "ZipRecruiter",
  //     job_required_education: {
  //       postgraduate_degree: false,
  //       professional_certification: false,
  //       high_school: false,
  //       associates_degree: false,
  //       bachelors_degree: false,
  //     },
  //     job_required_experience: {
  //       no_experience_required: false,
  //       required_experience_in_months: 12,
  //       experience_mentioned: true,
  //       experience_preferred: false,
  //     },
  //     job_required_skills: null,
  //     job_salary_currency: null,
  //     job_salary_period: null,
  //     job_state: "NC",
  //     job_title: "React Developer",
  //   },
  //   {
  //     employer_company_type: null,
  //     employer_logo: null,
  //     employer_name: "Goli Tech",
  //     employer_website: null,
  //     job_apply_is_direct: true,
  //     job_apply_link:
  //       "https://www.ziprecruiter.com/c/Goli-Tech/Job/React-Developer/-in-Charlotte,NC?jid=dee8f53deb990ad5",
  //     job_apply_quality_score: 0.5706,
  //     job_benefits: null,
  //     job_city: "Charlotte",
  //     job_country: "US",
  //     job_description:
  //       "Charlotte Mecklenburg Police Department is in need of a current temporary position to be filled. Please find the information on the position attached along with the contact information and other details below.\n• Job Description: CMPD React Developer\n• Location: Hybrid- remote and 601 East Trade St. Charlotte NC 28202 (CMPD Headquarters)\n• Start Date: As soon as possible until 06/30/2024 (2080 hours approximately)\n• Hiring Contact: Trivonna Nance: TJ.Nance@charlottenc.gov\n• POSTING DATE: 05/01/2023 UNTIL: 05/09/2023\n\nGeneral Summary:\n\nThe candidate works with the requesting department to develop software applications. The candidate should have good experience translating customer requirements into working designs and code. The candidate collaborates heavily with the development team, Business Analysts, UX/UI, and Quality Assurance team. The candidate participates in all stages of the Agile development cycle. The candidate should have experience with React hook framework as well as function-based components.\n\nResponsibilities:\n• Actively participates in Agile planning, development, and testing processes.\n• Accurately estimates tasks and assignments.\n• Collaborates with project team to design and develop application features.\n• Develop front-end application content.\n• Develop and maintain the back-end components of application such as servers, databases, and APIs.\n• Troubleshooting and debugging application to identify and resolve technical issues.\n• Ensuring that the application meets industry standards and best practices.\n\nEducation:\n• Bachelor's degree in Computer Science or demonstrated equivalent experience.\n\nTechnical Skills\n• React JS, HTML5, SCSS, CSS3, JSON, JavaScript,Node.js, Axios\n• Development tools: VS Code or other modern IDE\n• Debugging tools: Firebug, Chrome Developer Tools, or other browser or IDE based tools\n• Frameworks: React JS (v16 or higher), Node.js.\n• Servers: Apache HTTP Web Server (or other HTTP Server)\n• Platforms: Windows, Linux,\n• Methodologies: Agile, Waterfall\n• Database : Oracle or other relation database\n• Programming Languages : JavaScript, Java, Oracle PL/SQL (Java and PL/SQL are a plus but not required)\n• Content Management: git\n\nProfessional Experience\n• Design, develop and test applications using React that meet accessibility and web browser standards for website.\n• At least 1 year of full project lifecycle experience with function based React components.\n• Experience with features such as hooks and context.\n• Experience with modern JavaScript features.\n• Experience with React state management. Such as using packages like Recoil, Context, or Redux.\n• Experience with error handling methods in React environment.\n• Experience configuring React application environments. Such as App Server .configuration, Application configuration files such as package.json .\n• Experience using libraries such as Axios or Fetch to make asynchronous HTTP requests.\n• Experience using unit testing tools for React.\n• Design CSS templates ( Background, positioning, text, border, margin, padding, and table).\n• Apply optimization techniques to reduce page size and load times.\n• Experience developing single page applications (SPA).\n• Work with React functional components, Forms, Events, Keys, Router.\n• Familiar with services (RESTful) for transmission of large blocks JSON.\n• Familiar with React component libraries such Prime React.\n• Use Restful web services calls for POST, PUT, DELETE and GET methods.\n• Work with unit test frameworks to write unit tests for JavaScript code.\n• Use debugging tools such as Firebug and Chrome Developer Tools.\n• Interact with Testing Team, and Business Analysts for fixing of Issues.\n• Perform System Testing, Regression Testing for Complete UI after fixing Issues which are reported by Testing Team.\n\nRequired Skills : React,Javascript\nBasic Qualification :\nAdditional Skills : Software Developer",
  //     job_employment_type: "TEMPORARY",
  //     job_experience_in_place_of_education: false,
  //     job_google_link:
  //       "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer&start=0&ltype=1&chips=date_posted:week,requirements:years3under&schips=date_posted;week,requirements;years3under&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer&htidocid=NGy3DGydpT8AAAAAAAAAAA%3D%3D",
  //     job_highlights: {
  //       Qualifications: Array(30),
  //       Responsibilities: Array(12),
  //     },
  //     job_id: "NGy3DGydpT8AAAAAAAAAAA==",
  //     job_is_remote: true,
  //     job_job_title: null,
  //     job_latitude: 35.227085,
  //     job_longitude: -80.843124,
  //     job_max_salary: null,
  //     job_min_salary: null,
  //     job_offer_expiration_datetime_utc: "2023-06-01T00:00:00.000Z",
  //     job_offer_expiration_timestamp: 1685577600,
  //     job_onet_job_zone: "3",
  //     job_onet_soc: "15113400",
  //     job_posted_at_datetime_utc: "2023-05-02T15:37:00.000Z",
  //     job_posted_at_timestamp: 1683041820,
  //     job_posting_language: "en",
  //     job_publisher: "ZipRecruiter",
  //     job_required_education: {
  //       postgraduate_degree: false,
  //       professional_certification: false,
  //       high_school: false,
  //       associates_degree: false,
  //       bachelors_degree: false,
  //     },
  //     job_required_experience: {
  //       no_experience_required: false,
  //       required_experience_in_months: 12,
  //       experience_mentioned: true,
  //       experience_preferred: false,
  //     },
  //     job_required_skills: null,
  //     job_salary_currency: null,
  //     job_salary_period: null,
  //     job_state: "NC",
  //     job_title: "React Developer",
  //   },
  //   {
  //     employer_company_type: null,
  //     employer_logo: null,
  //     employer_name: "Goli Tech",
  //     employer_website: null,
  //     job_apply_is_direct: true,
  //     job_apply_link:
  //       "https://www.ziprecruiter.com/c/Goli-Tech/Job/React-Developer/-in-Charlotte,NC?jid=dee8f53deb990ad5",
  //     job_apply_quality_score: 0.5706,
  //     job_benefits: null,
  //     job_city: "Charlotte",
  //     job_country: "US",
  //     job_description:
  //       "Charlotte Mecklenburg Police Department is in need of a current temporary position to be filled. Please find the information on the position attached along with the contact information and other details below.\n• Job Description: CMPD React Developer\n• Location: Hybrid- remote and 601 East Trade St. Charlotte NC 28202 (CMPD Headquarters)\n• Start Date: As soon as possible until 06/30/2024 (2080 hours approximately)\n• Hiring Contact: Trivonna Nance: TJ.Nance@charlottenc.gov\n• POSTING DATE: 05/01/2023 UNTIL: 05/09/2023\n\nGeneral Summary:\n\nThe candidate works with the requesting department to develop software applications. The candidate should have good experience translating customer requirements into working designs and code. The candidate collaborates heavily with the development team, Business Analysts, UX/UI, and Quality Assurance team. The candidate participates in all stages of the Agile development cycle. The candidate should have experience with React hook framework as well as function-based components.\n\nResponsibilities:\n• Actively participates in Agile planning, development, and testing processes.\n• Accurately estimates tasks and assignments.\n• Collaborates with project team to design and develop application features.\n• Develop front-end application content.\n• Develop and maintain the back-end components of application such as servers, databases, and APIs.\n• Troubleshooting and debugging application to identify and resolve technical issues.\n• Ensuring that the application meets industry standards and best practices.\n\nEducation:\n• Bachelor's degree in Computer Science or demonstrated equivalent experience.\n\nTechnical Skills\n• React JS, HTML5, SCSS, CSS3, JSON, JavaScript,Node.js, Axios\n• Development tools: VS Code or other modern IDE\n• Debugging tools: Firebug, Chrome Developer Tools, or other browser or IDE based tools\n• Frameworks: React JS (v16 or higher), Node.js.\n• Servers: Apache HTTP Web Server (or other HTTP Server)\n• Platforms: Windows, Linux,\n• Methodologies: Agile, Waterfall\n• Database : Oracle or other relation database\n• Programming Languages : JavaScript, Java, Oracle PL/SQL (Java and PL/SQL are a plus but not required)\n• Content Management: git\n\nProfessional Experience\n• Design, develop and test applications using React that meet accessibility and web browser standards for website.\n• At least 1 year of full project lifecycle experience with function based React components.\n• Experience with features such as hooks and context.\n• Experience with modern JavaScript features.\n• Experience with React state management. Such as using packages like Recoil, Context, or Redux.\n• Experience with error handling methods in React environment.\n• Experience configuring React application environments. Such as App Server .configuration, Application configuration files such as package.json .\n• Experience using libraries such as Axios or Fetch to make asynchronous HTTP requests.\n• Experience using unit testing tools for React.\n• Design CSS templates ( Background, positioning, text, border, margin, padding, and table).\n• Apply optimization techniques to reduce page size and load times.\n• Experience developing single page applications (SPA).\n• Work with React functional components, Forms, Events, Keys, Router.\n• Familiar with services (RESTful) for transmission of large blocks JSON.\n• Familiar with React component libraries such Prime React.\n• Use Restful web services calls for POST, PUT, DELETE and GET methods.\n• Work with unit test frameworks to write unit tests for JavaScript code.\n• Use debugging tools such as Firebug and Chrome Developer Tools.\n• Interact with Testing Team, and Business Analysts for fixing of Issues.\n• Perform System Testing, Regression Testing for Complete UI after fixing Issues which are reported by Testing Team.\n\nRequired Skills : React,Javascript\nBasic Qualification :\nAdditional Skills : Software Developer",
  //     job_employment_type: "TEMPORARY",
  //     job_experience_in_place_of_education: false,
  //     job_google_link:
  //       "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer&start=0&ltype=1&chips=date_posted:week,requirements:years3under&schips=date_posted;week,requirements;years3under&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer&htidocid=NGy3DGydpT8AAAAAAAAAAA%3D%3D",
  //     job_highlights: {
  //       Qualifications: Array(30),
  //       Responsibilities: Array(12),
  //     },
  //     job_id: "NGy3DGydpT8AAAAAAAAAAA==",
  //     job_is_remote: true,
  //     job_job_title: null,
  //     job_latitude: 35.227085,
  //     job_longitude: -80.843124,
  //     job_max_salary: null,
  //     job_min_salary: null,
  //     job_offer_expiration_datetime_utc: "2023-06-01T00:00:00.000Z",
  //     job_offer_expiration_timestamp: 1685577600,
  //     job_onet_job_zone: "3",
  //     job_onet_soc: "15113400",
  //     job_posted_at_datetime_utc: "2023-05-02T15:37:00.000Z",
  //     job_posted_at_timestamp: 1683041820,
  //     job_posting_language: "en",
  //     job_publisher: "ZipRecruiter",
  //     job_required_education: {
  //       postgraduate_degree: false,
  //       professional_certification: false,
  //       high_school: false,
  //       associates_degree: false,
  //       bachelors_degree: false,
  //     },
  //     job_required_experience: {
  //       no_experience_required: false,
  //       required_experience_in_months: 12,
  //       experience_mentioned: true,
  //       experience_preferred: false,
  //     },
  //     job_required_skills: null,
  //     job_salary_currency: null,
  //     job_salary_period: null,
  //     job_state: "NC",
  //     job_title: "React Developer",
  //   },
  //   {
  //     employer_company_type: null,
  //     employer_logo: null,
  //     employer_name: "Goli Tech",
  //     employer_website: null,
  //     job_apply_is_direct: true,
  //     job_apply_link:
  //       "https://www.ziprecruiter.com/c/Goli-Tech/Job/React-Developer/-in-Charlotte,NC?jid=dee8f53deb990ad5",
  //     job_apply_quality_score: 0.5706,
  //     job_benefits: null,
  //     job_city: "Charlotte",
  //     job_country: "US",
  //     job_description:
  //       "Charlotte Mecklenburg Police Department is in need of a current temporary position to be filled. Please find the information on the position attached along with the contact information and other details below.\n• Job Description: CMPD React Developer\n• Location: Hybrid- remote and 601 East Trade St. Charlotte NC 28202 (CMPD Headquarters)\n• Start Date: As soon as possible until 06/30/2024 (2080 hours approximately)\n• Hiring Contact: Trivonna Nance: TJ.Nance@charlottenc.gov\n• POSTING DATE: 05/01/2023 UNTIL: 05/09/2023\n\nGeneral Summary:\n\nThe candidate works with the requesting department to develop software applications. The candidate should have good experience translating customer requirements into working designs and code. The candidate collaborates heavily with the development team, Business Analysts, UX/UI, and Quality Assurance team. The candidate participates in all stages of the Agile development cycle. The candidate should have experience with React hook framework as well as function-based components.\n\nResponsibilities:\n• Actively participates in Agile planning, development, and testing processes.\n• Accurately estimates tasks and assignments.\n• Collaborates with project team to design and develop application features.\n• Develop front-end application content.\n• Develop and maintain the back-end components of application such as servers, databases, and APIs.\n• Troubleshooting and debugging application to identify and resolve technical issues.\n• Ensuring that the application meets industry standards and best practices.\n\nEducation:\n• Bachelor's degree in Computer Science or demonstrated equivalent experience.\n\nTechnical Skills\n• React JS, HTML5, SCSS, CSS3, JSON, JavaScript,Node.js, Axios\n• Development tools: VS Code or other modern IDE\n• Debugging tools: Firebug, Chrome Developer Tools, or other browser or IDE based tools\n• Frameworks: React JS (v16 or higher), Node.js.\n• Servers: Apache HTTP Web Server (or other HTTP Server)\n• Platforms: Windows, Linux,\n• Methodologies: Agile, Waterfall\n• Database : Oracle or other relation database\n• Programming Languages : JavaScript, Java, Oracle PL/SQL (Java and PL/SQL are a plus but not required)\n• Content Management: git\n\nProfessional Experience\n• Design, develop and test applications using React that meet accessibility and web browser standards for website.\n• At least 1 year of full project lifecycle experience with function based React components.\n• Experience with features such as hooks and context.\n• Experience with modern JavaScript features.\n• Experience with React state management. Such as using packages like Recoil, Context, or Redux.\n• Experience with error handling methods in React environment.\n• Experience configuring React application environments. Such as App Server .configuration, Application configuration files such as package.json .\n• Experience using libraries such as Axios or Fetch to make asynchronous HTTP requests.\n• Experience using unit testing tools for React.\n• Design CSS templates ( Background, positioning, text, border, margin, padding, and table).\n• Apply optimization techniques to reduce page size and load times.\n• Experience developing single page applications (SPA).\n• Work with React functional components, Forms, Events, Keys, Router.\n• Familiar with services (RESTful) for transmission of large blocks JSON.\n• Familiar with React component libraries such Prime React.\n• Use Restful web services calls for POST, PUT, DELETE and GET methods.\n• Work with unit test frameworks to write unit tests for JavaScript code.\n• Use debugging tools such as Firebug and Chrome Developer Tools.\n• Interact with Testing Team, and Business Analysts for fixing of Issues.\n• Perform System Testing, Regression Testing for Complete UI after fixing Issues which are reported by Testing Team.\n\nRequired Skills : React,Javascript\nBasic Qualification :\nAdditional Skills : Software Developer",
  //     job_employment_type: "TEMPORARY",
  //     job_experience_in_place_of_education: false,
  //     job_google_link:
  //       "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=react+developer&start=0&ltype=1&chips=date_posted:week,requirements:years3under&schips=date_posted;week,requirements;years3under&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=react+developer&htidocid=NGy3DGydpT8AAAAAAAAAAA%3D%3D",
  //     job_highlights: {
  //       Qualifications: Array(30),
  //       Responsibilities: Array(12),
  //     },
  //     job_id: "NGy3DGydpT8AAAAAAAAAAA==",
  //     job_is_remote: true,
  //     job_job_title: null,
  //     job_latitude: 35.227085,
  //     job_longitude: -80.843124,
  //     job_max_salary: null,
  //     job_min_salary: null,
  //     job_offer_expiration_datetime_utc: "2023-06-01T00:00:00.000Z",
  //     job_offer_expiration_timestamp: 1685577600,
  //     job_onet_job_zone: "3",
  //     job_onet_soc: "15113400",
  //     job_posted_at_datetime_utc: "2023-05-02T15:37:00.000Z",
  //     job_posted_at_timestamp: 1683041820,
  //     job_posting_language: "en",
  //     job_publisher: "ZipRecruiter",
  //     job_required_education: {
  //       postgraduate_degree: false,
  //       professional_certification: false,
  //       high_school: false,
  //       associates_degree: false,
  //       bachelors_degree: false,
  //     },
  //     job_required_experience: {
  //       no_experience_required: false,
  //       required_experience_in_months: 12,
  //       experience_mentioned: true,
  //       experience_preferred: false,
  //     },
  //     job_required_skills: null,
  //     job_salary_currency: null,
  //     job_salary_period: null,
  //     job_state: "NC",
  //     job_title: "React Developer",
  //   },
  // ]);
  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key": getApiKey(keyIdx),
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          date_posted: "month",
          remote_jobs_only: "true",
          employment_types: "FULLTIME",
          job_requirements: "under_3_years_experience",
        },
        params: {
          query: `/search/${searchTx}`,
          page: page.toString(),
          num_pages: "5",
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  // const { data, isLoading, error } = useFetch("search", keyIdx, {
  //   query: "React developer",
  //   page: "1",
  //   num_pages: "5",
  //   date_posted: "week",
  //   remote_jobs_only: "true",
  //   // employment_types: "FULLTIME",
  //   job_requirements: "under_3_years_experience",
  //   job_requirements: "no_experience",
  //   job_requirements: " no_degree
  // });
  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    // router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };
  const handleNext = (state) => {
    if (state) {
      setPage(page + 1);
      handleSearch();
    } else if (page > 0 && !state) {
      setPage(page - 1);
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <SearchBox
        handleSearch={handleSearch}
        setSearchTx={setSearchTx}
        setKeyIdx={setKeyIdx}
        keyIdx={keyIdx}
      />
      <div className="grid grid-cols-1 gap-3 mx-2">
        {searchRes.map((info, index) => (
          <JobCard info={info} key={index} />
        ))}
      </div>
      <div className="btn-group">
        <button onClick={() => handleNext(0)} className="btn">
          «
        </button>
        <button className="btn">Page {page}</button>
        <button onClick={() => handleNext(1)} className="btn">
          »
        </button>
      </div>
    </div>
  );
};

export default Jobs;
