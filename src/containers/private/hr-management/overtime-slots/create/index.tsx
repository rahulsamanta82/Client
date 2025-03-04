import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
  CreateOvertimeSlotSection,
  CreateOvertimeSlotMain,
  CreateOvertimeSlotTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateOvertimeSlot: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    { title: "Overtime Slots / ", path: siteRoutes.overtimeSlotsListing },
    { title: "Add New Slot", path: siteRoutes.createOvertimeSlot },
  ]
  const [formData, setFormData] = useState({ is_active: 1 });
  const { register } = useForm<any>();

  const handleChange = (event: any) => {

  }

  return (
    <CreateOvertimeSlotMain>
      <CreateOvertimeSlotTop>
        <div className="left">
          <span className="page-heading">Add New Slot</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateOvertimeSlotTop>

      <CreateOvertimeSlotSection className="content-radius-shadow">
        <div className="common-fields">
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
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Fall 2023" />
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
      </CreateOvertimeSlotSection>
    </CreateOvertimeSlotMain>
  );
};

export default CreateOvertimeSlot;
