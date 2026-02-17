import { useState } from "react";

export function useUpdationState() {
    const [updatePopUp, setUpdatePopUp] = useState(false);
    return [updatePopUp, setUpdatePopUp];
}