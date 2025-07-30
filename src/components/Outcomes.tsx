
"use client"

import type { Outcome } from "@/app/page";
import OutcomeItem from "./OutcomeItem";


function Outcomes({ outcomes, removeHandler }: { outcomes: Outcome[], removeHandler: (id: Number) => void }) {
    return (
        <ul>
            {
                outcomes.map(outcome => (
                    <OutcomeItem key={outcome.id} outcome={outcome} removeHandler={removeHandler} />
                ))
            }
        </ul>
    );
}

export default Outcomes
