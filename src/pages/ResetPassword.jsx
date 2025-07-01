import React, { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const resetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Format d'email invalide")
        .refine(
            (email) => email.includes('@') && email.includes('.'),
            "L'email doit contenir un @ et un domaine valide"
        ),
});

const ResetPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        setLoading(true);
        
        // Simuler l'envoi d'email
        setTimeout(() => {
            console.log('Email de réinitialisation envoyé à:', data.email);
            setIsSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div>
                        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                            <span className="text-2xl">✅</span>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Email envoyé !
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Si un compte existe avec l'adresse <strong>{getValues('email')}</strong>, vous recevrez un lien de réinitialisation.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <Link
                            to="/login"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Retour à la connexion
                        </Link>
                        <Link
                            to="/"
                            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-2xl">🔑</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Mot de passe oublié
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Entrez votre adresse email pour recevoir un lien de réinitialisation
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Adresse email
                        </label>
                        <input
                            {...register('email')}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={`mt-1 appearance-none relative block w-full px-3 py-3 border ${
                                errors.email ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.email ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                            } focus:z-10 sm:text-sm transition-colors duration-200`}
                            placeholder="votre@email.com"
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={loading || !isValid}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Envoi en cours...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Envoyer le lien de réinitialisation
                                </>
                            )}
                        </button>
                        
                        <Link
                            to="/login"
                            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Retour à la connexion
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
