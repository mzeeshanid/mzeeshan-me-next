export class MyStrapiError extends Error {
    public readonly status?: number;
    
    constructor(message: string, status?: number) {
        super(message);
        this.name = "StrapiError";
        this.status = status;
    }
}