'use client';
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import z from 'zod';
import { motion,AnimatePresence } from 'framer-motion';
import { MoveLeft, MoveRight } from 'lucide-react';

export const CompanySchema = z.object({
    name: z.string(),
    companyEmail: z.string().email(),
    compnayPhone: z.string(),
    companyAddress: z.string(),
    companyCity: z.string(),
});

export type CompanyType = z.infer<typeof Company>;

const StratPage = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [formData, setFormData] = React.useState<CompanyType | null>(null);
    const methods = useForm<CompanyType>({
        resolver: zodResolver(CompanySchema),
    });
    const { handleSubmit, control, formState: { errors } } = methods;


    
    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    return (
        <div className='relative z-30 gap-2 px-6 flex flex-col justify-start items-start w-full overflow-x-hidden'>
            <div className="w-full flex flex-col mt-14 gap-2">
                <h1 className='text-2xl font-semibold text-slate-800'>
                    Setup your Account first
                </h1>
                <p className='text-sm text-slate-500'>
                    Let's get started by setting up your account first so we can get to know you better.
                </p>
            </div>
            <div className="flex w-full overflow-hidden h-full rounded-lg border border-slate-400/35  bg-white mt-12 py-5 px-2 flex-col gap-3 justify-start items-start">
                <AnimatePresence>

                {currentStep === 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    className="flex md:max-w-lg flex-col gap-3 w-full">
                     <div className="flex flex-col gap-3">
                        <Label htmlFor="name">Company Name</Label>
                        <Controller
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Company Name"
                                    error={errors.name?.message}
                                />
                            )}
                            name="name"
                            control={control}
                        />
                     </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="companyEmail">Company Email</Label>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Company Email"
                                        error={errors.companyEmail?.message}
                                    />
                                )}
                                name="companyEmail"
                                control={control}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="companyPhone">Company Phone</Label>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Company Phone"
                                        error={errors.compnayPhone?.message}
                                    />
                                )}
                                name="compnayPhone"
                                control={control}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="companyAddress">Company Address</Label>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Company Address"
                                        error={errors.companyAddress?.message}
                                    />
                                )}
                                name="companyAddress"
                                control={control}
                            />
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

               <div className="flex w-full gap-2 justify-end items-center">
                     <Button
                          onClick={handleNextStep}
                          variant={'outline'}
                          className={`text-sm font-semibold`}
                          disabled={currentStep === 0}
                     >
                     <MoveLeft size={16} />
                     </Button>

                        <Button
                            onClick={handlePrevStep}
                            variant={'outline'}
                            className={`text-sm font-semibold`}
                        >
                          <MoveRight size={16} />
                        </Button>
               </div>
            </div>
        </div>
    );
}

export default StratPage