import { Injectable } from "@angular/core";

export interface Message {
    createdAt: any; // o Date, dependiendo de tus necesidades
    id: string;
    from: string;
    msg: string;
    fromName: string;
    myMsg: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor() {}

    addChatMessage(from: string, msg: string, fromName: string, myMsg: boolean): Message {
        return {
            createdAt: new Date(), // Asigna la hora actual como marca de tiempo de creación
            id: '', // Asigna el ID del mensaje según sea necesario
            from: from,
            msg: msg,
            fromName: fromName,
            myMsg: myMsg
        };
    }
}
