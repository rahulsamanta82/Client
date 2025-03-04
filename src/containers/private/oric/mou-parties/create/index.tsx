import { FC } from "react";
import {
  CreateMouPartiesForm,
  CreateMouPartiesMain,
  CreateMouPartiesTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateMouParties: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "MoU’s Party /", path: siteRoutes.oricMouPartyListing },
    { title: "Add Party", path: siteRoutes.createOricMouParty },

    
  ];

  return (
    <CreateMouPartiesMain>
      <CreateMouPartiesTop>
        <div className="heading">
          <span className="page-heading">Add Party</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateMouPartiesTop>

      <CreateMouPartiesForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Party Title</label>
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
      </CreateMouPartiesForm>
    </CreateMouPartiesMain>
  );
};

export default CreateMouParties;
