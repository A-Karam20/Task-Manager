import {createContext} from "react";

export const InitialState = createContext({
    columns : {
        column1: {
            strength: "S1",
            id: "column1",
            title: "Important And Urgent",
            taskIds: []
          },
          column2: {
            strength: "S2",
            id: "column2",
            title: "Important But Not Urgent",
            taskIds: []
          },
          column3: {
            strength: "S3",
            id: "column3",
            title: "Not Important But Urgent",
            taskIds: []
          },
          column4: {
            strength: "S4",
            id: "column4",
            title: "Not Important And Not Urgent",
            taskIds: []
          },
    },
    columnOrder: ["column1", "column2", "column3", "column4"],
})