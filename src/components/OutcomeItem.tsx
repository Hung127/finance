"use client"

import type { Outcome } from "@/app/page";


function OutcomeItem({ outcome, removeHandler }: { outcome: Outcome, removeHandler: (id: Number) => void }) {
    return (
        <li>
            <span>{outcome.name}</span> <span>{outcome.date}</span> <span>{outcome.cost}</span>
            <button onClick={() => removeHandler(outcome.id)}>Remove</button>
            <button>Edit</button>
        </li >
    );
}

export default OutcomeItem;
