export class Media {
    private title: string;
    private username: string;
  
    constructor(title: string, username: string) {
        this.title = title;
        this.username = username;
    }
    
    getMediaTitle(): string {
        return this.title;
    }
    getMediaUsername(): string {
        return this.username;
    }
}
