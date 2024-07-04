import { NextResponse, NextRequest } from "next/server"
import db from "@/(auth)/secrets"
import { verifyToken } from "@/(auth)/lib/auth"


const firstNames = [
    "Mohamed", "Fatima", "Youssef", "Aicha", "Karim", "Saida", "Ahmed", "Rachida", "Omar",
    "Naima", "Abdelkader", "Hanae", "Samir", "Khadija", "Mouad", "Siham", "Hamza", "Malika",
    "Ismail", "Leila", "Noureddine", "Bouchra", "Rida", "Zineb", "Yassine"
];

const lastNames = [
    "El Bouchikhi", "El Mansouri", "Fassi", "Jabiri", "Ben Ahmed", "Bouazza", "El Idrissi",
    "Alaoui", "Benjelloun", "Mouline", "El Guerrouj", "Ammari", "Benkirane", "Naciri",
    "El Karkouri", "Zouiten", "El Fassi", "Chraibi", "Amrani", "Ibnou", "El Bakkali",
    "Aziz", "Haddad", "El Hamdaoui", "Ouazzani"
];

// Generate a random job title
const jobTitles = [
    "Engineer", "Architect", "Foreman", "Laborer", "Surveyor", "Planner", "Project Manager",
    "Estimator", "Safety Officer", "Operator", "Site Supervisor", "Construction Manager",
    "Quantity Surveyor", "Civil Engineer", "Electrician", "Plumber", "Carpenter",
    "Mason", "Welder", "Heavy Equipment Operator", "Concrete Finisher", "Steel Erector",
    "Roofer", "Painter", "Project Coordinator"
];
const randomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString(); // Ensure it includes the time part
};

const generateEmployee = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const hireDate = randomDate(new Date(2010, 0, 1), new Date());
    const phone = `+212${Math.floor(Math.random() * 900000000 + 100000000)}`;

    return {
        firstName,
        lastName,
        jobTitle,
        hireDate,
       
        phone,
        monthSalary: Math.floor(Math.random() * 2000) + 1000 // Random salary between 3000 and 8000
    };
};



type Payload = {
    id: string
    email: string
    username: string
    profile: string
    role: string
    iat: number
}

export const dynamic = "force-dynamic"
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get("token")?.value
        if (!token) {
            return Response.json({ status: "error", message: "No token found" })
        }

        const { payload } = (await verifyToken(token)) as { payload: Payload }

        if (!payload) {
            return Response.json({ status: "error", message: "No token found" })
        }

        // First get the user  
        const user = await db.user.findUnique({
            where: {
                id: payload.id,
            },
            select: {
                company: true,
            },
        })

        // Then get the company
        const company = await db.company.findUnique({
            where: {
                id: user?.company?.id,
            }
        })

        if (!company) {
            return Response.json({
                status: 400,
                message: "Please try again later.",
                data: null,
            })
        }

        for (let i = 0; i < 100; i++) {
            await db.employee.create({
                data:{
                    ...generateEmployee(),
                    companyId: company.id
                }
            });
        }

        return Response.json({
            status: 200,
            message: "Employees created successfully",
        })



    } catch (error) {
        console.log(error)
        return Response.json({
            status: 400,
            message: "Please try again later.",
            data: null,
        })
    }
}
