import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
  CreateAcademicInternshipSection,
  CreateAcademicInternshipMain,
  CreateAcademicInternshipTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateAcademicInternship: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },

    { title: "Internships /", path: siteRoutes.academicInternshipsListing },
    { title: "Add Internship", path: siteRoutes.createAcademicInternship },
  ]
  const [formData, setFormData] = useState({ is_active: 1 });
  const { register } = useForm<any>();

  const handleChange = (event: any) => {

  }

  return (
    <CreateAcademicInternshipMain>
      <CreateAcademicInternshipTop>
        <div className="left">
          <span className="page-heading">Add Internship</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateAcademicInternshipTop>

      <CreateAcademicInternshipSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Student</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Student</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Organization</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Organization</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Offer Letter No</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Completion Letter No</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>From date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>To date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Status</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Status</option>
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
      </CreateAcademicInternshipSection>
    </CreateAcademicInternshipMain>
  );
};

export default CreateAcademicInternship;
