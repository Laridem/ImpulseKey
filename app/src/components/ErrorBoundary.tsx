import { Component, ErrorInfo, ReactNode } from 'react';

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <span className="text-6xl">😵</span>
            </div>
            <h1 className="font-space-grotesk font-bold text-[32px] text-[#231821] mb-4">
              Oops! Something went wrong
            </h1>
            <p className="font-72-brand text-[16px] text-[#534150] mb-8 leading-[1.6]">
              We encountered an unexpected error. Don't worry, your progress is safe.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-6 py-3 text-white font-72-brand text-[15px] rounded-full"
                style={{
                  background: 'linear-gradient(145deg, #c026d3 0%, #800082 50%, #800082 100%)',
                  boxShadow: '0 4px 0 0 #800082, 0 8px 16px -4px rgba(128,0,130,0.4)'
                }}
              >
                Return to Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 text-[#534150] font-72-brand text-[15px] rounded-full border-2 border-[#d8bfd1] bg-white hover:border-[#800082] hover:text-[#800082] active:border-[#800082] active:text-[#800082] transition-colors"
              >
                Try Again
              </button>
            </div>
            {this.state.error && (
              <details className="mt-8 text-left">
                <summary className="font-jetbrains-mono text-[12px] text-[#800082] cursor-pointer hover:underline">
                  Technical Details
                </summary>
                <pre className="mt-2 p-4 bg-[#f7e3ef] rounded text-[10px] font-jetbrains-mono text-[#231821] overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
