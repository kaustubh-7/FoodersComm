import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({params}) {
    const meal = getMeal(params.slug);

    if(!meal){
        notFound();
    }

    return (
        {
            title: meal.title,
            description: meal.summary,
        }
    );
    
}

export default function MealDetails({params}){
    const meal = getMeal(params.slug);

    if(!meal){
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />'); 
    /* .replace() – replaces parts of a string
       /\n/g – matches all newline characters (the g means “global”, not just the first  one) 
       '<br />' – inserts an HTML line break wherever there was a \n */

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{ //dangerouslySetInnerHTML prop lets you directly inject raw HTML into your component
                    __html: meal.instructions,
                }}></p>
            </main>
        </>
    );
}