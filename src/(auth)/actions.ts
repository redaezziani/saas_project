'use server';

import db from "./secrets";



export const DeleteEmployee= async(id)=>{
    try {
        const res = await db.employee.delete({
            where:{
                id
            }
        })
        
        return true
    } catch (error) {
        console(error)
    }
}