"use client"
import { useParams, useRouter } from 'next/navigation'

import React, { useEffect } from 'react'

function HouseholdDetailPage() {
    const router = useRouter();
    console.log(router.query);
    const params = useParams()
    console.log(params);

    return (
        <div>HouseholdDetailPage</div>
    )
}

export default HouseholdDetailPage