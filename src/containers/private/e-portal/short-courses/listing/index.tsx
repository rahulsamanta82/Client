import { FC } from "react";
import {
    CourseCard,
    CoursesListingSection,
    CoursesWrapper,
    EPShortCoursesMain,
    EPShortCoursesTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { SmallWhiteRightArrow } from "assets/images/e-portal/svgs";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface ShortCoursesListingProps { }

const EPShortCoursesListing: FC<ShortCoursesListingProps> = ({ }) => {
    const { hasAccess } = useStore();
    return (
        <EPShortCoursesMain>
            <EPShortCoursesTop>
                <div className="left">
                    <span className="page-heading">Short Courses</span>
                    <Breadcrumb />
                </div>
            </EPShortCoursesTop>
            <CoursesListingSection>
                <div className="heading">
                    <span>Sir Sadiq Research & Computing Center</span>
                </div>
                <CoursesWrapper>
                    {[1, 2, 3].map((item: number, index: number) => {
                        return (
                            <CourseCard key={index}>
                                <div className="card-header">
                                    <div className="header-text">
                                        <span className="title">
                                            E-Rozgaar Web Development/Wordpress
                                        </span>
                                        <span className="batch">Batch: 16</span>
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="info">
                                        <span className="title">
                                            Sir Sadiq Research & Computing Center
                                        </span>
                                    </div>
                                    <div className="info">
                                        <span className="title">Start Date:</span>
                                        <span className="detail">11-08-2024 (Tentative Date)</span>
                                    </div>
                                    <div className="info">
                                        <span className="title">Last Date To Apply:</span>
                                        <span className="detail">11-08-2024 (Tentative Date)</span>
                                    </div>
                                    <div className="info">
                                        <span className="title">Duration:</span>
                                        <span className="detail">
                                            2 Months (Summer Vacation Batch)
                                        </span>
                                    </div>
                                    <div className="info">
                                        <span className="title">Fee:</span>
                                        <span className="detail">Rs. 6000</span>
                                    </div>
                                </div>
                                {hasAccess(sitePermissions.ePortalShortCoursesApply) && (
                                    <div className="apply-button">
                                        <button className="lg-rounded-btn">
                                            <span className="icon">
                                                <SmallWhiteRightArrow />
                                            </span>
                                            <span className="title">Apply Now</span>
                                        </button>
                                    </div>
                                )}
                            </CourseCard>
                        );
                    })}
                </CoursesWrapper>
            </CoursesListingSection>
        </EPShortCoursesMain>
    );
};

export default EPShortCoursesListing;
