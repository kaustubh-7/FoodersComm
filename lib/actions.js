'use server'; //this guarantees that this function will execute on the server
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

 
function InvalidText(text){
    return !text || text.trim() === '';
}

export async function shareMeal( prevState, formData){
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if (
        InvalidText(meal.title) ||
        InvalidText(meal.summary) ||
        InvalidText(meal.instructions) ||
        InvalidText(meal.creator) ||
        InvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ){
        return {
            message: 'Invlaid Input',
        };
    }

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
}