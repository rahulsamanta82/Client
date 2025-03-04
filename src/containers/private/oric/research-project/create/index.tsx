import { FC } from "react";
import {
  CreateProjectTimeForm,
  CreateProjectTimeMain,
  CreateProjectTimeTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateResearchProject: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    {
      title: "Research Projects /",
      path: siteRoutes.oricResearchProjectListing,
    },
    {
      title: "Add Research Project",
      path: siteRoutes.createOricResearchProject,
    },
  ];

  return (
    <CreateProjectTimeMain>
      <CreateProjectTimeTop>
        <div className="heading">
          <span className="page-heading">Add Research Project</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateProjectTimeTop>

      <CreateProjectTimeForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Name of Employee</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select One</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Name of Co PI</label>
            <div className="field-wrap">
              <div className="field">
              <input type="text" placeholder="Name of Co PI" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Designation of Co PI</label>
            <div className="field-wrap">
              <div className="field">
              <input type="text" placeholder="Designation of Co PI" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Co PI Institute</label>
            <div className="field-wrap">
              <div className="field">
              <input type="text" placeholder="Co PI Institute" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
              <input type="text" placeholder="Title" />
              </div>
            </div>
          </div>
        
          <div className="input-field">
            <label htmlFor="">Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
       
          <div className="input-field">
            <label htmlFor="">Project Type</label>
            <div className="field-wrap">
              <div className="field">
               <select>
                <option>Select One</option>
               </select>
              </div>
            </div>
          </div>
        </div>
        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </CreateProjectTimeForm>
    </CreateProjectTimeMain>
  );
};

export default CreateResearchProject;
