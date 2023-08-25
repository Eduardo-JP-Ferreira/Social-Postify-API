export class Post {
    private title: string;
    private text: string;
    private image: string;

    constructor(title: string, text: string, image: string) {
        this.title = title;
        this.text = text;
        this.image = image;
    }
    
    getPostTitle(): string {
        return this.title;
    }
    getPostText(): string {
        return this.text;
    }
    getPostImage(): string {
        return this.image;
    }
}
