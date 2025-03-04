import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
    CreateAcademicSemesterTypeSection,
    CreateAcademicSemesterTypeMain,
    CreateAcademicSemesterTypeTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateAcademicSemesterType: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Semester Types  / ", path: siteRoutes.academicSemesterTypesListing },
        { title: "Add Semester Type", path: siteRoutes.createAcademicSemesterType },
    ]
    const [formData, setFormData] = useState({ is_active: 1 });
    const { register } = useForm<any>();

    const handleChange = (event: any) => {

    }

    return (
        <CreateAcademicSemesterTypeMain>
            <CreateAcademicSemesterTypeTop>
                <div className="left">
                    <span className="page-heading">Add Semester Type</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicSemesterTypeTop>

            <CreateAcademicSemesterTypeSection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>Semester Type Title</label>
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
            </CreateAcademicSemesterTypeSection>
        </CreateAcademicSemesterTypeMain>
    );
};

export default CreateAcademicSemesterType;
