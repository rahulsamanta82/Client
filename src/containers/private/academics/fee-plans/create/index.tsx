import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
  CreateFeePlanSection,
  CreateFeePlanMain,
  CreateFeePlanTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateAcademicFeePlan: FC = () => {
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
    <CreateFeePlanMain>
      <CreateFeePlanTop>
        <div className="left">
          <span className="page-heading"> Add Fee Plan</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateFeePlanTop>

      <CreateFeePlanSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Name</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" id="" />
              </div>
            </div>
          </div>
          <div className="radio-field">
            <label htmlFor="no">Is Virtual</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                <label htmlFor="active">Yes</label>
              </div>
              <div className="field">
                <input type="radio" id="inactive" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                <label htmlFor="inactive">No</label>
              </div>
            </div>
          </div>
        </div>
        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn">& Exit</button>
          </div>
        </div>
      </CreateFeePlanSection>
    </CreateFeePlanMain>
  );
};

export default CreateAcademicFeePlan;
