import { FastifyRequest, FastifyReply } from "fastify"
import { createNutricionService } from "../services/createNutricionService";

export interface DataProps{
    name: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
    objective: string;
    level: string;
}

class createNutricionControler{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, weight, height, age, gender, objective, level } = request.body as DataProps;

        const createNutition = new createNutricionService();

        const nutrition = await createNutition.execute({
            name,
            weight,
            height,
            gender,
            objective,
            age,
            level,
        });

        reply.send(nutrition);
    }
}

export { createNutricionControler }