import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
    CreateStudentGroupSection,
    CreateStudentGroupMain,
    CreateStudentGroupTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateStudentGroup: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Student Groups  / ", path: siteRoutes.studentGroupListing },
        { title: "Add Student Group  / ", path: siteRoutes.createStudentGroup },
    ]
    const [formData, setFormData] = useState({ is_active: 1 });
    const { register } = useForm<any>();

    const handleChange = (event: any) => {

    }

    return (
        <CreateStudentGroupMain>
            <CreateStudentGroupTop>
                <div className="left">
                    <span className="page-heading">Add Student Group</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateStudentGroupTop>

            <CreateStudentGroupSection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>Group Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Description</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Description" />
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
            </CreateStudentGroupSection>
        </CreateStudentGroupMain>
    );
};

export default CreateStudentGroup;
