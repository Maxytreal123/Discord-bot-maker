export interface DiscordBotMakerError extends Error {
}

export interface DiscordBotMakerErrorConstructor extends ErrorConstructor {
    new(message?: string): DiscordBotMakerError;
    (message?: string): DiscordBotMakerError;
    readonly prototype: DiscordBotMakerError;
}

export declare var DiscordBotMakerError: DiscordBotMakerErrorConstructor;