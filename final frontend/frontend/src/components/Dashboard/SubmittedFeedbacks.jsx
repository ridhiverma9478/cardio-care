import { useState } from 'react';
import { AlertCircle, Check, X, Clock } from 'lucide-react';

const SubmittedFeedbacks = () => {
  const [feedbacks] = useState([
    {
      id: 1,
      title: 'Feature Request: Night Mode',
      content: 'It would be great to have a dark mode option...',
      status: 'pending',
      date: '3 days ago'
    },
    {
      id: 2,
      title: 'Bug Report: Camera Feed Issue',
      content: 'Experiencing lag in the camera feed...',
      status: 'resolved',
      date: '1 week ago'
    },
    {
      id: 3,
      title: 'Suggestion: Mobile App',
      content: 'Would love to see a mobile version...',
      status: 'reviewing',
      date: '2 weeks ago'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'reviewing':
        return <AlertCircle className="w-4 h-4 text-cyan-400" />;
      default:
        return <X className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-400/10 text-green-400';
      case 'pending':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'reviewing':
        return 'bg-cyan-400/10 text-cyan-400';
      default:
        return 'bg-red-400/10 text-red-400';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-100">Submitted Feedbacks</h2>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-100 font-medium">{feedback.title}</h3>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm ${getStatusColor(feedback.status)}`}>
                {getStatusIcon(feedback.status)}
                <span>{feedback.status}</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-2">{feedback.content}</p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-slate-500 text-xs">{feedback.date}</span>
              <button className="text-cyan-400 hover:text-cyan-300 text-xs">View Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Total Feedbacks</p>
          <p className="text-2xl font-bold text-slate-100">12</p>
        </div>
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Resolved</p>
          <p className="text-2xl font-bold text-green-400">8</p>
        </div>
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">3</p>
        </div>
        <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm">In Review</p>
          <p className="text-2xl font-bold text-cyan-400">1</p>
        </div>
      </div>
    </div>
  );
};

export default SubmittedFeedbacks;
