import { cliente } from "./index.js";
let voto1 = 0,
    voto2 = 0;

export const iniciarApuesta = (mensaje, apuesta) => {
    cliente.say("Elumbraldelanoche", apuesta);
};

export const lecturaPuntos = (mensaje) => {
    if (mensaje == 1) {
        voto1 += 1;
    } else if (mensaje == 2) {
        voto2 += 1;
    }
    return [voto1, voto2];
};
export const lecturaVotos = () => {
    console.log(voto1);
    console.log(voto2);
};
