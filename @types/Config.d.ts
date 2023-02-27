export interface Config {
    numberOfTeams: number;
    isFromShareLink?: boolean;
    isReset?: boolean;
    isFromLocalStorage?: boolean;
    teamsFormatName:
        | "default"
        | "fruits"
        | "flags"
        | "animals"
        | "placeholder"
        | string;
}