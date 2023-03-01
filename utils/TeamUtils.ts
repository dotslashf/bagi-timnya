import {LocalStorageUtils} from "./localstorageUtils";
import {TeamsObject} from "../@types/TeamsObject";

export class TeamUtils {
    private key: string = "players";
    private readonly localstorageUtils: LocalStorageUtils<TeamsObject[]> | undefined;

    constructor() {
        if (this.localstorageUtils == undefined) {
            this.localstorageUtils = new LocalStorageUtils<TeamsObject[]>();
        }
    }

    push(players: TeamsObject[]): void {
        this.delete();
        this.localstorageUtils?.storeItem({
            key: this.key,
            items: players
        });
    }

    delete() {
        const currentItem = this.localstorageUtils?.retrieveItem({
            key: this.key
        });
        if (currentItem) {
            this.localstorageUtils?.removeItem(this.key);
        }
    }

    read() {
        return this.localstorageUtils?.retrieveItem({key: this.key})
    }
}