import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import LanguagesListing from "containers/private/library/languages/listing";
import CreateLanguages from "containers/private/library/languages/create";
import LibraryPublishersListing from "containers/private/library/publishers/listing";
import CreateLibraryPublishers from "containers/private/library/publishers/create";
import CreateLibrarySeller from "containers/private/library/sellers/create";
import LibrarySellerListing from "containers/private/library/sellers/listing";
import LibraryBillListing from "containers/private/library/bills/listing";
import CreateLibraryBills from "containers/private/library/bills/create";
import LibraryBooksListing from "containers/private/library/books/listing";
import CreateLibraryBooks from "containers/private/library/books/create";
import LibraryAccessRegisterListing from "containers/private/library/library-accession-register-list";



const Library: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.libraryLanguagelist, true)}
        Component={LanguagesListing}
      />
       <Route
        path={getPathToSetRoute(siteRoutes.createLibraryLanguage, true)}
        Component={CreateLanguages}
      />
        <Route
        path={getPathToSetRoute(siteRoutes.libraryPublisherlist, true)}
        Component={LibraryPublishersListing}
      />
       <Route
        path={getPathToSetRoute(siteRoutes.createLibraryPublisher, true)}
        Component={CreateLibraryPublishers}
      />

<Route
        path={getPathToSetRoute(siteRoutes.librarySellerlist, true)}
        Component={LibrarySellerListing}
      />
       <Route
        path={getPathToSetRoute(siteRoutes.createLibrarySeller, true)}
        Component={CreateLibrarySeller}
      />


<Route
        path={getPathToSetRoute(siteRoutes.libraryBillslist, true)}
        Component={LibraryBillListing}
      />
       <Route
        path={getPathToSetRoute(siteRoutes.createLibraryBills, true)}
        Component={CreateLibraryBills}
      />


<Route
        path={getPathToSetRoute(siteRoutes.libraryBookslist, true)}
        Component={LibraryBooksListing}
      />
       <Route
        path={getPathToSetRoute(siteRoutes.createLibraryBooks, true)}
        Component={CreateLibraryBooks}
      />
           <Route
        path={getPathToSetRoute(siteRoutes.libraryAccessRegisterlist, true)}
        Component={LibraryAccessRegisterListing}
      />
        

      
    </Routes>
  );
};

export default Library;
