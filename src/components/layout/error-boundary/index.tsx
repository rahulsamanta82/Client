import React, { Component, ReactNode } from "react";
import { TrackJS } from "trackjs";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorInfo {
  componentStack?: string;
}

const token: string | undefined = process.env.REACT_APP_TRACKJS_TOKEN;

if (process.env.NODE_ENV === "production" && token) {
  TrackJS.install({ token });
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (errorInfo && errorInfo.componentStack) {
      console.log(errorInfo.componentStack);
    }

    if (process.env.NODE_ENV === "production" && token) {
      TrackJS.track(error);
    }
  }

  render(): ReactNode {
    return this.props.children;
  }
}
