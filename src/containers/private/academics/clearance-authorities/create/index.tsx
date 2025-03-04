import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
    CreateClearanceAuthoritySection,
    CreateClearanceAuthorityMain,
    CreateClearanceAuthorityTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateClearanceAuthority: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Clearance Authorities  / ", path: siteRoutes.clearanceAuthoritiesListing },
        { title: "Add Clearance Authority", path: siteRoutes.createClearanceAuthority },
    ]
    const [formData, setFormData] = useState({ is_active: 1 });
    const { register } = useForm<any>();

    const handleChange = (event: any) => {

    }

    return (
        <CreateClearanceAuthorityMain>
            <CreateClearanceAuthorityTop>
                <div className="left">
                    <span className="page-heading">Add Clearance Auhtority</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateClearanceAuthorityTop>

            <CreateClearanceAuthoritySection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>Title</label>
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
            </CreateClearanceAuthoritySection>
        </CreateClearanceAuthorityMain>
    );
};

export default CreateClearanceAuthority;
