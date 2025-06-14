import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface PasswordChangeModalProps {
    isOpen: boolean;
    onPasswordChange: (oldPassword: string, newPassword: string) => void
    onClose: () => void;
}

interface FormValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose, onPasswordChange }) => {
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);


    const validate = (values: FormValues) => {
        const errors: Partial<FormValues> = {};

        if (!values.currentPassword) {
            errors.currentPassword = 'Current password is required';
        }

        if (!values.newPassword) {
            errors.newPassword = 'New password is required';
        } else if (values.newPassword.length < 8) {
            errors.newPassword = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.newPassword)) {
            errors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        if (!values.confirmNewPassword) {
            errors.confirmNewPassword = 'Please confirm your new password';
        } else if (values.newPassword !== values.confirmNewPassword) {
            errors.confirmNewPassword = 'Passwords do not match';
        }

        if (values.currentPassword === values.newPassword) {
            errors.newPassword = 'New password must be different from current password';
        }

        return errors;
    };

    const handleSubmit = async (values: FormValues) => {
        await onPasswordChange(values.currentPassword, values.newPassword)
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Lock className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmNewPassword: '',
                        }}
                        validate={validate}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            id="currentPassword"
                                            name="currentPassword"
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.currentPassword && touched.currentPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter your current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            id="newPassword"
                                            name="newPassword"
                                            type={showNewPassword ? 'text' : 'password'}
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.newPassword && touched.newPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter your new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.confirmNewPassword && touched.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Confirm your new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h4>
                                    <ul className="text-xs text-blue-700 space-y-1">
                                        <li>• At least 8 characters long</li>
                                        <li>• At least one uppercase letter</li>
                                        <li>• At least one lowercase letter</li>
                                        <li>• At least one number</li>
                                        <li>• Different from your current password</li>
                                    </ul>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                        className="flex-1"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Changing...' : 'Change Password'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default PasswordChangeModal;