export interface ListProgramsObjectType {
    programs: {
        programId: string,
        quantity: number
    }[];
    quantity: number;
}