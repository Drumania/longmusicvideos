
import { Shield, MessageCircle, MicOff, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

export function GuidelineCard() {
  const rules = [
    { icon: <Shield size={20} />, text: 'Respect each other' },
    { icon: <MessageCircle size={20} />, text: 'No spamming' },
    { icon: <MicOff size={20} />, text: 'No NSFW content' },
    { icon: <EyeOff size={20} />, text: 'No personal info' },
    { icon: <AlertTriangle size={20} />, text: 'No illegal content' },
  ];

  return (
    <div className="relative p-px rounded-lg bg-gradient-to-r from-teal-400 to-purple-500">
      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">COMMUNITY GUIDELINES</h2>
          <p className="text-gray-400">General Rules</p>
        </div>
        
        <ul className="space-y-4 mb-6">
          {rules.map((rule, index) => (
            <li key={index} className="flex items-center gap-4">
              <div className="text-teal-300">{rule.icon}</div>
              <span className="text-white">{rule.text}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800">
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
}
