import { FC } from "react";
import {
  CreateSellerForm,
    CreateSellerMain,
    CreateSellerTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateLibrarySeller: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    { title: "Sellers /", path: siteRoutes.librarySellerlist },
    { title: "Add Seller", path: siteRoutes.createLibrarySeller },
  ];

  return (
    <CreateSellerMain>
      <CreateSellerTop>
        <div className="heading">
          <span className="page-heading">Add Seller</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateSellerTop>

      <CreateSellerForm className="content-radius-shadow">
        <div className="common-fields">
        <div className="input-field">
            <label htmlFor="">Seller Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Seller Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Name</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Name" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Address</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Address" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">City</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="City" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Country</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Country" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Phone Number</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Phone Number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Mobile</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Mobile" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Fax</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Fax" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Email</label>
            <div className="field-wrap">
              <div className="field">
                <input type="email" placeholder="Email" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Website</label>
            <div className="field-wrap">
              <div className="field">
                <input type="url" placeholder="Website" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">NTN</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="NTN" />
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
      </CreateSellerForm>
    </CreateSellerMain>
  );
};

export default CreateLibrarySeller;
