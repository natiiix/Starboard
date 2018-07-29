export class LRBT<T> {
    public left: T;
    public right: T;
    public bottom: T;
    public top: T;

    public constructor(left: T, right: T, bottom: T, top: T) {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
    }
}
