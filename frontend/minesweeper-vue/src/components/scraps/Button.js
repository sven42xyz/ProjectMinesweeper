export default class Button {
    IsBomb = false;
    IsRevealed = false;
    nBombs = 0;

    constructor() 
    {
        this.IsBomb = false;
        this.IsRevealed = false;
        this.nBombs = 0;
    }
    
    getIsBomb()
    {
        return this.IsBomb;
    }
    getIsRevealed()
    {
        return this.IsRevealed
    }
    getnBombs()
    {
        return this.nBombs;
    }
    setnBombs(i){
        this.nBombs = this.nBombs + i;
    }
    setIsBomb(){
        this.IsBomb = true;
    }
    setIsRevealed(){
        this.IsRevealed = true;
    }
}