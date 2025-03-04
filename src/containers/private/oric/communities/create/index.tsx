import { FC } from "react";
import {
  CreateCommunityForm,
  CreateCommunityMain,
  CreateCommunityTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateOricCommunities: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Community Listing /", path: siteRoutes.oricCommunityListing },
    { title: "Add Community", path: siteRoutes.createOricCommunity },

    
  ];

  return (
    <CreateCommunityMain>
      <CreateCommunityTop>
        <div className="heading">
          <span className="page-heading">Add Community</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateCommunityTop>

      <CreateCommunityForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Community Title</label>
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
      </CreateCommunityForm>
    </CreateCommunityMain>
  );
};

export default CreateOricCommunities;
