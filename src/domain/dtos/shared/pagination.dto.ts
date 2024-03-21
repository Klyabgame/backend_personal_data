
export class paginationDto{
    private constructor(
        public readonly page:number,
        public readonly limit:number,
    ){}


    static create(page:number=1, limit:number=10 ):[string?,paginationDto?]{

        if( isNaN(page) || isNaN(limit)) return ['page and limit must be numbers',undefined];

        if(page <=0) return ['page must be greater than 0',undefined];
        if(limit <=0) return ['limit mut be greater than 0', undefined];



        return [undefined,new paginationDto(page,limit)];
    }
}