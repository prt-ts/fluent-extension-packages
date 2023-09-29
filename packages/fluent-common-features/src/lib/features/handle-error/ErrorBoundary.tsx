/* eslint-disable */
import * as React from "react";
import { ErrorFallback } from "../../components/error-fallback/ErrorFallback";

export class ErrorBoundary extends React.Component<{ fallback?: JSX.Element, children }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false,  error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error : error };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    this.setState({ hasError: true, error : error });
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return (
        (this.props as any).fallback || (
          <ErrorFallback error={(this.state as any).error} />
        )
      );
    }

    return this.props.children;
  }
}
