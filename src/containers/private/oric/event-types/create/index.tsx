import { FC } from "react";
import {
  CreateEventTypeForm,
    CreateEventTypeMain,
    CreateEventTypeTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateOricEventType: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Conference Type Listing /", path: siteRoutes.oricEventTypesListing },
    { title: "Add Conference Type", path: siteRoutes.createOricEventTypes },

  ];

  return (
    <CreateEventTypeMain>
      <CreateEventTypeTop>
        <div className="heading">
          <span className="page-heading">Add Conference Type</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateEventTypeTop>

      <CreateEventTypeForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Event Type Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text"  />
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
      </CreateEventTypeForm>
    </CreateEventTypeMain>
  );
};

export default CreateOricEventType;
