import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Person{
    name:string;
    number:number;
    email:string;
    status:string;
}

interface PersonState{
    person:Person[];
}

const initialState:PersonState = {
    person:[],
};

export const PersonSlice = createSlice({
    name:"person",
    initialState,
    reducers:{
        addPerson:(state,action:PayloadAction<{name:string,number:number,email:string,
        status: 'active' | 'inactive'}>) => {
            state.person.push({
                name: action.payload.name,
                number: action.payload.number,
                email: action.payload.email,
                status: action.payload.status,
            });
        },

        updatePerson:  (state, action:PayloadAction<Person>)=> {
            const updatePerson =  action.payload;
            const index = state.person.findIndex(person => person.name === updatePerson.name);
            if(index !== -1){
                state.person[index] = updatePerson;
            }
        },
        deletePerson: (state, action: PayloadAction<string>) => {
            state.person = state.person.filter(
              (person) => person.name !== action.payload
            );
        },
    },
});

export default PersonSlice.reducer;

export const { addPerson,updatePerson,deletePerson } = PersonSlice.actions;

