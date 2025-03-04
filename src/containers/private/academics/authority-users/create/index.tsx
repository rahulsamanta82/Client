import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
    CreateAcademicAuthorityUserSection,
    CreateAcademicAuthorityUserMain,
    CreateAcademicAuthorityUserTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateAcademicAuthorityUser: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Authorities / ", path: siteRoutes.academicAuthorityListing },
        { title: "Users list / ", path: siteRoutes.academicAuthorityUsersListing },
        { title: "Add Authority User", path: siteRoutes.createAcademicAuthorityUser },
    ]
    const [formData, setFormData] = useState({ is_active: 1 });
    const { register } = useForm<any>();

    const handleChange = (event: any) => {

    }

    return (
        <CreateAcademicAuthorityUserMain>
            <CreateAcademicAuthorityUserTop>
                <div className="left">
                    <span className="page-heading">Add Authority User</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicAuthorityUserTop>

            <CreateAcademicAuthorityUserSection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>User ID</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="User ID" />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Department</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select>
                                    <option value="">Select Department</option>
                                </select>
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
            </CreateAcademicAuthorityUserSection>
        </CreateAcademicAuthorityUserMain>
    );
};

export default CreateAcademicAuthorityUser;
