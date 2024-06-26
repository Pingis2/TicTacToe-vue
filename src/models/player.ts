export class Player {
    id: number;
    player1: boolean;

    constructor(public text: string) {
        this.id = Date.now();
        this.player1 = true;
    }
}