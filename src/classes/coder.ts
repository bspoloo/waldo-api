

export class Coder {
    private codeGenerated: Set<string>;

    constructor() {
        this.codeGenerated = new Set<string>();
    }

    public generateCode(long: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';

        do {
            code = '';
            for (let i = 0; i < long; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                code += chars[randomIndex]
            }
        } while (this.codeGenerated.has(code));
        this.codeGenerated.add(code)
        return code;
    }
}