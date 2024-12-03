import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { childrenSchema, type ChildrenFormData } from '../../lib/validators';

interface ChildRegistrationFormProps {
  onSubmit: (data: ChildrenFormData) => void;
  initialData?: ChildrenFormData;
  isLoading?: boolean;
}

const ChildRegistrationForm: React.FC<ChildRegistrationFormProps> = ({
  onSubmit,
  initialData = [],
  isLoading = false,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ children: ChildrenFormData }>({
    resolver: zodResolver(childrenSchema.transform((data) => ({ children: data }))),
    defaultValues: {
      children: initialData.length > 0 ? initialData : [{ fullName: '', birthDate: '', gender: 'male' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data.children))} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-purple-primary/20"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-primary">
                Child {index + 1}
              </h3>
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
                <label className="block text-purple-primary font-medium mb-1">
                  Full Name
                </label>
                <input
                  {...register(`children.${index}.fullName`)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
                  placeholder="Enter child's name"
                  disabled={isLoading}
                />
                {errors.children?.[index]?.fullName && (
                  <p className="text-coral-primary text-sm mt-1">
                    {errors.children[index]?.fullName?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-purple-primary font-medium mb-1">
                  Birth Date
                </label>
                <input
                  type="date"
                  {...register(`children.${index}.birthDate`)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
                  disabled={isLoading}
                />
                {errors.children?.[index]?.birthDate && (
                  <p className="text-coral-primary text-sm mt-1">
                    {errors.children[index]?.birthDate?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-purple-primary font-medium mb-1">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register(`children.${index}.gender`)}
                      value="male"
                      className="mr-2"
                      disabled={isLoading}
                    />
                    <span className="text-purple-primary">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register(`children.${index}.gender`)}
                      value="female"
                      className="mr-2"
                      disabled={isLoading}
                    />
                    <span className="text-purple-primary">Female</span>
                  </label>
                </div>
                {errors.children?.[index]?.gender && (
                  <p className="text-coral-primary text-sm mt-1">
                    {errors.children[index]?.gender?.message}
                  </p>
                )}
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
          type="submit"
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