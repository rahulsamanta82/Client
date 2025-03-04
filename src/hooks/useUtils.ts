const useUtils = () => {
  const isCurrentWidthMinimum = (): boolean => {
    return window.innerWidth <= 1279;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLocalFilePath = (file: File): string => {
    return URL.createObjectURL(file);
  };

  const getQueryParams: any = () => {
    return window.location.search
      .replace(/^\?/, "")
      .split("&")
      .reduce((obj, str) => {
        if (!str) return obj;
        const pair = str.split("=");
        return { ...obj, [pair[0]]: pair[1] };
      }, {});
  };

  const downloadFileWithUrl = (url: string) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    let urlToDownload = "";
    if (baseUrl && url.includes(baseUrl)) {
      urlToDownload = url;
    } else {
      urlToDownload = `${baseUrl}/${url}`;
    }
    const a = document.createElement("a");
    a.href = a.download = urlToDownload;
    a.click();
  };

  const extractAfterZeroDot = (str: string, fieldIndex: number = 0) => {
    const prefix = `${fieldIndex}.`;
    const index = str.indexOf(prefix);

    if (index !== -1) {
      return str.substring(index + prefix.length);
    }

    return '';
  };

  const openExternalLink = (url: string) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    let urlToNavigate = "";
    if (baseUrl && url.includes(baseUrl)) {
      urlToNavigate = url;
    } else {
      urlToNavigate = `${baseUrl}/${url}`;
    }
    window.open(urlToNavigate, "_blank");
  };

  const hasAccess = (permission: string): boolean => {
    const permissions: any = localStorage.getItem("permissions");
    return permissions.includes(permission);
  };

  const getDateFromDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const compareDateStrings = (date1: string, date2: string): boolean => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    return startDate < endDate;
  };

  const createQuery = (params: any = {}): string => {
    let query = '';
    let i = 0;
    for (let key in params) {
      query += `${i === 0 ? '?' : '&'}${key}=${params[key]}`;
      i++;
    }

    return query;
  }

  const handleSearchChange = (
    event: any,
    setSearch: Function,
    requestCallBack: Function
  ) => {
    const { value } = event.target;
    setSearch(value);
    if (value === "") requestCallBack(1, value);
  };

  const handleTableSearch = (event: any, requestCallBack: Function) => {
    if (event.key === "Enter") {
      requestCallBack(1, event.target.value);
    }
  };

  const splitPathBySlash = (path: string): string[] => {
    return path.split("/");
  };

  const getPathToSetRoute = (path: string, isModule: boolean = false): string => {
    const splittedPath: string[] = splitPathBySlash(path);
    const pagePath: string = splittedPath[splittedPath.length - 1];
    let pathToReturn: string = '';
    if (isModule) {
      const modulePath: string = splittedPath[splittedPath.length - 2];
      pathToReturn = `${modulePath}/${pagePath}`;
    } else {
      pathToReturn = pagePath;
    }
    return pathToReturn;
  }

  const concatPathWithBackendUrl = (path: string): string => {
    return `${process.env.REACT_APP_BASE_URL + path}`;
  }

  return {
    handleTableSearch,
    getPathToSetRoute,
    concatPathWithBackendUrl,
    splitPathBySlash,
    isCurrentWidthMinimum,
    handleSearchChange,
    scrollToTop,
    extractAfterZeroDot,
    getLocalFilePath,
    getQueryParams,
    downloadFileWithUrl,
    hasAccess,
    getDateFromDateTime,
    compareDateStrings,
    openExternalLink,
    createQuery
  };
};

export default useUtils;
