import ApplicantEnrollment from 'containers/private/hostel/applicant-enrollment';
import CreateApplicant from 'containers/private/hostel/applicant-management/create';
import ApplicantListing from 'containers/private/hostel/applicant-management/listing';
import AppliedApplicant from 'containers/private/hostel/applied-applicant';
import FinanceManagement from 'containers/private/hostel/finance-managment';
import HostelApplicantMeritList from 'containers/private/hostel/hostel-applicant-merit-list';
import HostelCreate from 'containers/private/hostel/hostel-management/create';
import HostelManagement from 'containers/private/hostel/hostel-management/listing/Index';
import HostelRoomCreate from 'containers/private/hostel/hostel-room-management/create';
import RoomListing from 'containers/private/hostel/hostel-room-management/listing/Index';
import CreateMerit from 'containers/private/hostel/merit-management/create';
import MeritListing from 'containers/private/hostel/merit-management/listing';
import RegisterdApplicant from 'containers/private/hostel/registered-applicant';
import CreateSession from 'containers/private/hostel/session-management/create';
import SessionListing from 'containers/private/hostel/session-management/listing';
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

const HostelRoutes: FC = () => {
    return (
        <Routes>
            <Route path='hostel-management/hostel-listing' Component={HostelManagement} />
            <Route path='hostel-management/create-hostel' Component={HostelCreate} />
            <Route path='hostel-rooms-management/hostel-rooms-listing' Component={RoomListing} />
            <Route path='hostel-rooms-management/create-hostel-room' Component={HostelRoomCreate} />
            <Route path='applicants-management/applicant-listing' Component={ApplicantListing}/>
            <Route path= 'applicants-management/create-applicant' Component={CreateApplicant}/>
            <Route path='/merit-management/merit-listing' Component={MeritListing}/>
            <Route path='/merit-management/create-merit' Component={CreateMerit}/>
            <Route path='session-management/hostel-session-listing' Component={SessionListing}/>
            <Route path='session-management/create-hostel-session' Component={CreateSession} />
            <Route path= 'finance-management/hostel-finance-management' Component={FinanceManagement} />
            <Route path='applied-applicant-management/applied-applicant' Component={AppliedApplicant} />
            <Route path='applicant-enrollment-management/applicant-enrollment' Component={ApplicantEnrollment} /> 
            <Route path='registered-applicant-management/registered-applicant' Component={RegisterdApplicant} />
            <Route path='hostel-applicant-merit-list-management/hostel-applicant-merit-list' Component={HostelApplicantMeritList}/>
        </Routes>
    )
}

export default HostelRoutes;