export class Publication {
    private mediaId: number;
    private postId: number;
    private date: Date;
  
    constructor(mediaId: number, postId: number, date: Date) {
        this.mediaId = mediaId;
        this.postId = postId;
        this.date = date;
    }
    
    getPublicationMediaId(): number {
        return this.mediaId;
    }
    getPublicationPostId(): number {
        return this.postId;
    }
    getPublicationDate(): Date {
        return this.date;
    }
}
