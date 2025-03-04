import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
  CreateAcademicInvigilatorSection,
  CreateAcademicInvigilatorMain,
  CreateAcademicInvigilatorTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateAcademicInvigilator: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },

    { title: "Fee Plans /", path: siteRoutes.academicFeePlansListing },
    { title: "Add Fee Plan", path: siteRoutes.createAcademicFeePlan },
  ]
  const [formData, setFormData] = useState({ is_active: 1 });
  const { register } = useForm<any>();

  const handleChange = (event: any) => {

  }

  return (
    <CreateAcademicInvigilatorMain>
      <CreateAcademicInvigilatorTop>
        <div className="left">
          <span className="page-heading">Add Invigilator</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateAcademicInvigilatorTop>

      <CreateAcademicInvigilatorSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Emp No.</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Emp No" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Invigilator Name</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Name" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>User ID</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="User ID" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>CNIC</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="CNIC" />
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
      </CreateAcademicInvigilatorSection>
    </CreateAcademicInvigilatorMain>
  );
};

export default CreateAcademicInvigilator;
