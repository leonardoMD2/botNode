import tmi from "tmi.js";
import { config } from "dotenv";
config();
let channel = "elumbraldelanoche";
let voto1 = 0,
    voto2 = 0;
export const cliente = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: "Elumbraldelanoche",
        password: process.env.API_KEY,
    },
    channels: ["elumbraldelanoche"],
});
cliente.connect();

cliente.on("message", (channel, tags, message, self) => {
    console.log(`${tags["display-name"]} : ${message}`);
});
cliente.on("message", (channel, tags, message, self) => {
    if (message === "!hola") {
        cliente.say(channel, `Hola @${tags["display-name"]}`);
    } else if (message === "!apuesta") {
        let apuesta = "Se gana?";
        cliente.say(channel, apuesta);
        cliente.say(
            channel,
            "Para votar escribir 1 para Sí, 2 para No. La votación cierra en 15s"
        );

        setTimeout(() => {
            cliente.say(
                channel,
                `Apuesta cerrada. Votos por si: ${voto1} no: ${voto2}`
            );
            cliente.say(
                channel,
                `Porcentajes: Si ${Math.round(
                    (voto1 * 100) / (voto1 + voto2)
                )} - No ${Math.round((voto2 * 100) / (voto1 + voto2))}`
            );
        }, 15000);
        return;
    }

    if (message === "1") {
        voto1 += 1;
    } else if (message === "2") {
        voto2 += 1;
    }
});

//lecturaPuntos(message);
// if (message == "!votos") {
//     votos = lecturaVotos();
// } else if (message === "!votados") {
//     cliente.say(channel, votos);
// } else if (message === "!iniciar") {
//     iniciarApuesta("Prueba de apuesta");
// }
// });
