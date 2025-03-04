import { FC } from "react";
import {
  CreateLibraryBillForm,
  CreateLibraryBillMain,
  CreateLibraryBillTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateLibraryBills: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    { title: "Bills ", path: siteRoutes.libraryBillslist },
    { title: "Add Bill", path: siteRoutes.createLibraryBills },
  ];

  return (
    <CreateLibraryBillMain>
      <CreateLibraryBillTop>
        <div className="heading">
          <span className="page-heading">Add Bill</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLibraryBillTop>

      <CreateLibraryBillForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Reference Number</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Reference Number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Billing Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Select Book Seller</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select one</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Department</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select one</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Location</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Location" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Amount</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Amount" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Discount</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Discount" />
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
      </CreateLibraryBillForm>
    </CreateLibraryBillMain>
  );
};

export default CreateLibraryBills;
