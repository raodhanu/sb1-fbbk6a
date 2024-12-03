import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { saveChildren } from '../../services/children';

interface ChildRegistrationFormProps {
  userId: string;
  initialData?: any;
  isLoading?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ChildRegistrationForm: React.FC<ChildRegistrationFormProps> = ({
  userId,
  initialData = [],
  isLoading = false,
  onSuccess,
  onError,
}) => {
  const {
    register,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      children: initialData.length > 0 ? initialData : [{ fullName: '', birthDate: '', gender: 'male' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  });

  const onFormSubmit = handleSubmit(async (data) => {
    console.log('Form data submitted without validation:', data);

    try {
      if (!userId) {
        throw new Error('User ID is missing.');
      }

      // Directly pass the submitted data
      await saveChildren(userId, data.children);
      console.log('Data saved successfully.');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving children:', error.message);
      if (onError) onError(error.message);
    }
  });

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-purple-primary/20"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-primary">Child {index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-coral-primary hover:text-coral-primary/80 transition-colors"
                disabled={isLoading}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-purple-primary font-medium mb-1">Full Name</label>
                <input
                  {...register(`children.${index}.fullName`)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
                  placeholder="Enter child's name"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-purple-primary font-medium mb-1">Birth Date</label>
                <input
                  type="date"
                  {...register(`children.${index}.birthDate`)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-purple-primary font-medium mb-1">Gender</label>
                <select
                  {...register(`children.${index}.gender`)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
                  disabled={isLoading}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => append({ fullName: '', birthDate: '', gender: 'male' })}
          className="flex items-center gap-2 px-6 py-3 bg-green-primary text-white rounded-full hover:bg-green-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <Plus className="w-5 h-5" />
          Add Another Child
        </button>

        <button
          type="button"
          onClick={() => {
            console.log('Button clicked! Triggering onFormSubmit...');
            onFormSubmit();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-coral-primary text-white rounded-full hover:bg-coral-primary/90 transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Children
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChildRegistrationForm;
