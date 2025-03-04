import { FC } from "react";
import {
  CreateProjectTimeForm,
  CreateProjectTimeMain,
  CreateProjectTimeTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import {
  AddOptionSvg,
  DeleteOptionSvg,
  RedCloseSvg,
} from "assets/images/common/svgs";

const CreateProjectManagement: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Project Management /", path: siteRoutes.oricProjectlisting },
    { title: "Add Project", path: siteRoutes.createOricProject },
  ];

  return (
    <CreateProjectTimeMain>
      <CreateProjectTimeTop>
        <div className="heading">
          <span className="page-heading">Add Project</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateProjectTimeTop>

      <CreateProjectTimeForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Core Areas</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select iub cores areas</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Faculties</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Faculties</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Department</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Department</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">PI</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Usman Ghanni" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Co-PI</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Co-PI" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Start Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">End Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Year</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>
        </div>
        <div className="right-btn">
          <button className="rounded-btn-task">+ Add Task</button>
        </div>
        <div className="extra-fields">
          <div className="common-fields">
            <div className="input-field">
              <label htmlFor="">Task Name</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Task Name" />
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="">Start Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" />
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="">Task End Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" />
                </div>
              </div>
            </div>
          </div>
          <div className="buttons-tasks">
            <div>
              <DeleteOptionSvg />
            </div>
            <div>
              <AddOptionSvg />
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

export default CreateProjectManagement;
