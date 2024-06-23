import { z } from "zod"

export const EmployeeSchema = z.object({
    id: z.string().cuid(),
    userId: z.string().uuid(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phone: z.string().nullable(),
    daySalary: z.number().nullable(),
    monthSalary: z.number().nullable(),
    hireDate: z.date(),
    jobTitle: z.string(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date(),
})

export type Employee = z.infer<typeof EmployeeSchema>
