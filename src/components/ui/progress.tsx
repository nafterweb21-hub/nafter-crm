"use client"
import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

function Progress({
    className,
    value,
    ...props
}: ProgressPrimitive.Root.Props) {
    return (
        <ProgressPrimitive.Root
            value={value}
            data-slot="progress"
            className={cn(
                "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Track className="size-full">
                <ProgressPrimitive.Indicator
                    className="h-full w-full flex-1 bg-primary transition-all duration-500"
                    style={{ width: `${value}%` }}
                />
            </ProgressPrimitive.Track>
        </ProgressPrimitive.Root>
    )
}

export { Progress }
