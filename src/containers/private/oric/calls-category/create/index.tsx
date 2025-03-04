import { FC } from "react";
import {
    CreateCategoryCallForm,
  CreateCategoryCallMain,
  CreateCategoryCallTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateCallCategory: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Calls /", path: siteRoutes.oricCallListing },
    { title: "Calls Categories /", path: siteRoutes.oricCallCategoriesListing },
    { title: "Add Call Category", path: siteRoutes.createOricCallCategories },


  ];

  return (
    <CreateCategoryCallMain>
      <CreateCategoryCallTop>
        <div className="heading">
          <span className="page-heading">Add Call Category</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateCategoryCallTop>

      <CreateCategoryCallForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Call Category Title</label>
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
      </CreateCategoryCallForm>
    </CreateCategoryCallMain>
  );
};

export default CreateCallCategory;
