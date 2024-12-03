import React from 'react';
import { Edit2 } from 'lucide-react';
import type { ChildFormData } from '../../lib/validators';

interface ChildCardProps {
  child: ChildFormData;
  onEdit: (child: ChildFormData) => void;
}

const ChildCard: React.FC<ChildCardProps> = ({ child, onEdit }) => {
  const birthDate = new Date(child.birthDate);
  const age = Math.floor((new Date().getTime() - birthDate.getTime()) / 31557600000);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-purple-primary/20">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-purple-primary mb-2">
            {child.fullName}
          </h3>
          <div className="space-y-1 text-purple-primary/80">
            <p>Age: {age} years old</p>
            <p>Birthday: {birthDate.toLocaleDateString()}</p>
            <p>Gender: {child.gender.charAt(0).toUpperCase() + child.gender.slice(1)}</p>
          </div>
        </div>
        <button
          onClick={() => onEdit(child)}
          className="text-coral-primary hover:text-coral-primary/80 transition-colors p-2"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChildCard;