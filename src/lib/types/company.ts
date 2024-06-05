import z from 'zod';

export const CompanySchema = z.object({
    name: z.string(),
    ownerId: z.string(),
    companyEmail: z.string().email(),
    compnayPhone: z.string(),
    companyAddress: z.string(),
    companyCity: z.string(),
});

export type CompanyType = z.infer<typeof Company>;