import { FC } from "react";
import {
  CreateMajorSubjectForm,
  CreateMajorSubjectMain,
  CreateMajorSubjectTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateMajorSubjects: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Major Subjects /", path: siteRoutes.oricMajorSubjectsListing },
    { title: "Add Subject", path: siteRoutes.createOricMajorSubjects },
  ];

  return (
    <CreateMajorSubjectMain>
      <CreateMajorSubjectTop>
        <div className="heading">
          <span className="page-heading">Add Subject</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateMajorSubjectTop>

      <CreateMajorSubjectForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Title" />
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
      </CreateMajorSubjectForm>
    </CreateMajorSubjectMain>
  );
};

export default CreateMajorSubjects;
