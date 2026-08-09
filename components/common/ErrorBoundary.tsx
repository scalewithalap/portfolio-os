/**
 * @file components/common/ErrorBoundary.tsx
 * @description React Class Component Error Boundary Fallback Wrapper.
 *
 * Responsibilities:
 * - Catches JavaScript runtime rendering errors in child component subtrees.
 * - Renders a sleek fallback UI alert card with error trace details.
 * - Provides a "Reload Component" action button to recover gracefully without crashing the whole OS session.
 */

import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in component boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-zinc-900/90 border border-red-500/30 rounded-2xl text-white flex flex-col items-center justify-center text-center space-y-3 font-sans h-full min-h-50">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <h3 className="font-bold text-sm text-white">{this.props.fallbackTitle || 'Component Error'}</h3>
          <p className="text-xs text-zinc-400 max-w-sm">
            {this.state.error?.message || 'An error occurred while loading this view.'}
          </p>
          <button
            onClick={this.handleReset}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Component</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
