import { twMerge } from "tailwind-merge"
enum AlertType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    DEFAULT = "default",
}

interface AlertMessageProps {
    type?: AlertType
    title: string
    description: string
    icon?: React.ReactNode
    className?: string
}

const AlertMessage = ({
    type,
    title,
    description,
    icon = null,
    className = "",
}: AlertMessageProps) => {
    return (
        <div
            className={twMerge(
                `mt-2 flex w-full items-center justify-between space-x-4 rounded px-4 py-3 ,${className} `,
            )}
        >
            <div className="flex items-center space-x-2">{icon}</div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
                <span className="font-semibold">{title}</span>
                <span className="text-sm font-normal">{description}</span>
            </div>
        </div>
    )
}

export default AlertMessage
