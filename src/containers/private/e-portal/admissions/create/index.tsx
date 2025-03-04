import { FC, useEffect, useState } from "react";
import {
  CreateAdmissionProgramFormSection,
  CreateAdmissionProgramMain,
  CreateAdmissionProgramTop,
  ProgramsSection,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { FormBuildingSvg } from "assets/images/common/svgs";
import useEportal from "../../useHooks";
import { AddAdmissionApplicationDTO } from "utils/helpers/models/e-portal/add-admission-application.dto";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";

const CreateEportalAdmissionsList: FC = () => {
  const [showEligible, setShowEligible] = useState(true);
  const {
    getAdmissionPrograms,
    submitAdmissionApplication,
    getCertificateLevelsByUser,
  } = useEportal();
  const [formData, setFormData] = useState<AddAdmissionApplicationDTO>(
    new AddAdmissionApplicationDTO()
  );

  const [programs, setPrograms] = useState<any>();
  const [programLevels, setProgramLevels] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [offerProgram, setOfferProgram] = useState<number>(1); // it will be set  to 1 by default under the guidance  of backend team

  const queryParams = {
    offer_program: offerProgram,
  };

  useEffect(() => {
    getAdmissionPrograms(setPrograms, { category_id: categoryId });
  }, [categoryId]);

  useEffect(() => {
    getCertificateLevelsByUser(setProgramLevels, queryParams);
  }, []);

  const onSubmit = () => {
    if (!formData?.programs?.length) {
      warningToaster(warningMessages.programsRequiredMsg);
    } else {
      submitAdmissionApplication(formData);
    }
  };

  const onSelectProgram = (program: any) => {
    const { id } = program;
    if (formData.programs?.includes(id)) {
      const index = formData.programs?.indexOf(id);
      formData.programs?.splice(index);
    } else {
      formData.programs?.push(id);
    }

    setFormData({ ...formData });
  };

  return (
    <CreateAdmissionProgramMain>
      <CreateAdmissionProgramTop>
        <div className="left">
          <span className="page-heading">Apply for Admissions</span>
          <Breadcrumb />
        </div>
      </CreateAdmissionProgramTop>
      <CreateAdmissionProgramFormSection>
        <div className="form-top">
          <p className="form-heading">Choose Program</p>
          <p className="top-para">
            Based on the information you have provided you are eligible only for
            below program(s).
            <span className="info"> More Info</span>
          </p>
        </div>

        <div className="common-fields">
          <div className="input-field">
            <label>Program Levels</label>
            <div className="field-wrap">
              <div className="field">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Level</option>
                  {Array.isArray(programLevels) &&
                    programLevels.map((item) => {
                      return <option value={item?.id}>{item?.title}</option>;
                    })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <ProgramsSection>
          <ul>
            <li
              className={`eligible-item ${showEligible ? "active" : ""}`}
              onClick={() => setShowEligible(true)}
            >
              <p>
                Eligible Programs{" "}
                <span className="numbers">
                  ({programs?.eligible_programs?.length ?? 0})
                </span>
              </p>
            </li>
            <li
              className={`not-eligible-item ${!showEligible ? "active" : ""}`}
              onClick={() => setShowEligible(false)}
            >
              <p>
                Not Eligible Programs{" "}
                <span className="numbers">
                  ({programs?.eligibility_criteria?.length ?? 0})
                </span>
              </p>
            </li>
          </ul>

          {showEligible ? (
            <div className="eligible-programs">
              {programs?.eligible_programs?.map((item: any, index: number) => (
                <div className="program-box" key={index}>
                  <div className="flex">
                    <input
                      type="checkbox"
                      checked={formData.programs?.includes(item?.id)}
                      onChange={() => onSelectProgram(item)}
                    />
                    <div>
                      <p className="program-name">{item.title}</p>
                      <p className="department">{item.department}</p>
                    </div>
                  </div>
                  <hr className="line" />
                  <div className="bottom-flex">
                    <div className="">
                      <FormBuildingSvg />
                      <span>{item?.campus_title}</span>
                    </div>
                    <ul>
                      <li className="eligible-item">
                        <p>Eligible Programs</p>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="not-eligible-programs">
              {programs?.eligibility_criteria?.map(
                (item: any, index: number) => (
                  <div className="program-box" key={index}>
                    <div className="flex">
                      <div>
                        <p className="program-name">{item?.program_title}</p>
                        <p className="department">{item?.department}</p>
                      </div>
                    </div>
                    {/* <div className="green-portion">
                      <div
                        className="green-text"
                        dangerouslySetInnerHTML={{
                          __html: item?.eligibility_criteria,
                        }}
                      ></div>
                    </div> */}
                    <div className="red-portion">
                      <p
                        className="red-text"
                        dangerouslySetInnerHTML={{ __html: item?.criteria }}
                      ></p>
                    </div>
                    <hr className="line" />
                    <div className="bottom-flex">
                      <div className="">
                        <FormBuildingSvg />
                        <span>{item?.campus}</span>
                      </div>
                      <ul>
                        <li className="not-eligible-item">
                          <p>Not Eligible Programs</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </ProgramsSection>

        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray">Close</button>
            <button className="lg-rounded-btn" type="button" onClick={onSubmit}>
              Apply
            </button>
          </div>
        </div>
      </CreateAdmissionProgramFormSection>
    </CreateAdmissionProgramMain>
  );
};

export default CreateEportalAdmissionsList;
