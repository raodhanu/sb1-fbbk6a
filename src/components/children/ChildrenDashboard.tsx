import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ChildRegistrationForm from './ChildRegistrationForm';
import ChildCard from './ChildCard';
import { saveChildren, getChildren } from '../../services/children';
import { useUser } from '../../hooks/useUser';
import type { ChildFormData, ChildrenFormData } from '../../lib/validators';

const ChildrenDashboard: React.FC = () => {
  const { user } = useUser();
  const [children, setChildren] = useState<ChildrenFormData>([]);
  const [editingChild, setEditingChild] = useState<ChildFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadChildren();
    }
  }, [user]);

  const loadChildren = async () => {
    if (!user) return;
    
    try {
      const data = await getChildren(user.id);
      setChildren(data);
    } catch (error) {
      toast.error('Failed to load children');
      console.error('Error loading children:', error);
    }
  };

  const handleSubmit = async (data: ChildrenFormData) => {
    if (!user) {
      toast.error('Please log in to save children');
      return;
    }

    setIsLoading(true);
    try {
      await saveChildren(user.id, data);
      await loadChildren();
      setEditingChild(null);
      toast.success(editingChild ? 'Child updated successfully' : 'Children saved successfully');
    } catch (error) {
      toast.error('Failed to save children');
      console.error('Error saving children:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (child: ChildFormData) => {
    setEditingChild(child);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-purple-primary mb-8">
        {editingChild ? 'Edit Child' : 'Register Your Children'}
      </h2>

      {editingChild ? (
        <ChildRegistrationForm
          onSubmit={handleSubmit}
          initialData={[editingChild]}
          isLoading={isLoading}
        />
      ) : children.length > 0 ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {children.map((child) => (
              <ChildCard
                key={child.id || child.fullName}
                child={child}
                onEdit={handleEdit}
              />
            ))}
          </div>
          <ChildRegistrationForm 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <ChildRegistrationForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ChildrenDashboard;