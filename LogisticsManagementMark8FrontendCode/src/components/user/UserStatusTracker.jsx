import React from 'react';
import { Check, Circle, Clock, AlertCircle } from 'lucide-react';

const UserStatusTracker = ({ trackingSteps, currentStatus }) => {
  const getStepIcon = (step, isCompleted, isCurrent) => {
    if (isCompleted) {
      return <Check className="w-5 h-5 text-white" />;
    } else if (isCurrent) {
      if (step.status === 'delayed') {
        return <AlertCircle className="w-5 h-5 text-white" />;
      }
      return <Clock className="w-5 h-5 text-white" />;
    }
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getStepColor = (step, isCompleted, isCurrent) => {
    if (isCompleted) return 'bg-green-500';
    if (isCurrent) {
      if (step.status === 'delayed') return 'bg-red-500';
      return 'bg-blue-500';
    }
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Progress</h3>
      
      <div className="relative">
        {trackingSteps.map((step, index) => {
          const isCompleted = step.completed;
          const isCurrent = step.status === currentStatus;
          const isLast = index === trackingSteps.length - 1;

          return (
            <div key={index} className="flex items-start space-x-4 pb-8 relative">
              {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getStepColor(step, isCompleted, isCurrent)} z-10`}>
                {getStepIcon(step, isCompleted, isCurrent)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h4>
                  {step.timestamp && (
                    <span className="text-sm text-gray-500">{step.timestamp}</span>
                  )}
                </div>
                
                <p className={`mt-1 text-sm ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                  {step.description}
                </p>
                
                {step.location && (
                  <p className="mt-1 text-xs text-gray-500">
                    Location: {step.location}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserStatusTracker;