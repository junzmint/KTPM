"use client"
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

import React, { useCallback, useEffect } from 'react'

function HouseholdDetailPage({ params }) {

    console.log(params);

    return (
        <div>HouseholdDetailPage</div>
    )
}

export default HouseholdDetailPage