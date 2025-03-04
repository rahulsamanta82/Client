import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
  CreateStudentStatusSection,
  CreateStudentStatusMain,
  CreateStudentStatusTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const SyncGradeTemplates: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    {
      title: "Grade Templates  / ",
      path: siteRoutes.academicGradeTemplatesListing,
    },
    {
      title: "Sync Grade Templates",
      path: siteRoutes.academicSyncGradeTemplates,
    },
  ];
  const [formData, setFormData] = useState({ is_active: 1 });
  const { register } = useForm<any>();

  const handleChange = (event: any) => {};

  return (
    <CreateStudentStatusMain>
      <CreateStudentStatusTop>
        <div className="left">
          <span className="page-heading">Sync Grading Templates</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateStudentStatusTop>

      <CreateStudentStatusSection className="content-radius-shadow">
        <div className="table-info-section">
          <div className="left-section">
            <div className="heading">
              <span>Obsolete Agri 100-5CR</span>
            </div>
          </div>
        </div>
        <div className="common-fields">
          <div className="input-field">
            <label>Credit Hours</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Credit Hours</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Course Code</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Course Code" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Session</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Session</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Program Level</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Program Level</option>
                </select>
              </div>
            </div>
          </div>
          <div className="radio-field">
            <label htmlFor="no">Common Course</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" id="yes" />
                <label htmlFor="yes">Yes</label>
              </div>
              <div className="field">
                <input type="radio" id="no" />
                <label htmlFor="no">No</label>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Faculty</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Faculty</option>
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
            <button className="lg-rounded-btn">Submit</button>
          </div>
        </div>
      </CreateStudentStatusSection>
    </CreateStudentStatusMain>
  );
};

export default SyncGradeTemplates;
