import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply }
 from 'fastify'
import { createNutricionControler } from './controlers/createNutricionControler'

 export async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
        
        let responseText = "```json\n{\n  \"nome\": \"Bruno\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 27,\n  \"altura\": 1.71,\n  \"peso\": 95,\n  \"objetivo\": \"Emagrecer\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"7:00\",\n      \"nome\": \"Cafe da manha\",\n      \"alimentos\": [\n        \"Aveia (1/2 xícara)\",\n        \"Leite desnatado (1 xícara)\",\n        \"Frutas vermelhas (1/2 xícara)\",\n        \"Nozes (uma pequena porção)\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da manha\",\n      \"alimentos\": [\n        \"Iogurte desnatado (1 pote)\",\n        \"Frutas (uma unidade media, tipo maçã ou banana)\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoço\",\n      \"alimentos\": [\n        \"Salada verde (folhas variadas)\",\n        \"Carne grelhada (150g - frango ou peixe)\",\n        \"Arroz integral (1/2 xícara)\",\n        \"Feijao (1/2 xícara)\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da tarde\",\n      \"alimentos\": [\n        \"Proteina de soja (ou outro shake proteico)\",\n        \"Frutas (uma unidade media)\"\n      ]\n    },\n    {\n      \"horario\": \"19:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"Salmao grelhado (150g) ou outra proteina magra\",\n        \"Vegetais cozidos no vapor (1 xícara)\",\n        \"Batata doce (metade media)\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Creatina (para auxiliar na performance fisica)\",\n    \"Proteina em pó (whey protein) (para auxiliar na recuperacao muscular e na manutencao da massa magra)\",\n    \"Cafeina (pode auxiliar na queima de gordura, mas com moderação)\"\n  ]\n}\n```"

        try{

            //Extrair o JSON
            let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

            let jsonObjetct = JSON.parse(jsonString);

            return reply.send({ data: jsonObjetct });

        }catch(err){
            console.log(err)
        }

        reply.send({ ok: true })
    })

    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return new createNutricionControler().handle(request, reply)
    })


 }