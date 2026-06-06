import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-destructive/10 text-destructive border border-destructive rounded-lg m-4">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <pre className="text-sm overflow-auto p-4 bg-white/50 rounded">{this.state.error?.message}</pre>
          <pre className="text-sm overflow-auto p-4 bg-white/50 rounded mt-2">{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
