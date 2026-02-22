import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="border-2 border-red-600 p-1">
              <div className="border-2 border-white p-8">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                  Application Error
                </h1>
                <p className="text-gray-300 mb-4">
                  Something went wrong loading the application.
                </p>
                <div className="bg-gray-900 p-4 rounded-lg overflow-auto">
                  <pre className="text-sm text-red-400">
                    {this.state.error?.toString()}
                  </pre>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
