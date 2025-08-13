import { IconButton, IconButtonProps } from "@chakra-ui/react"
import { Tooltip } from "../ui/tooltip"
import { Bookmark, Check } from "lucide-react"


interface Props extends IconButtonProps {
    isInList: boolean
    loading?: boolean
    onAddToList: () => void
    onRemoveFromList: () => void


}

export default function AddRemoveListIconButton({ isInList, loading, onAddToList, onRemoveFromList, ...props }: Props) {
    return isInList ? (
        <Tooltip content='Remove from list' showArrow closeDelay={0} >
            <IconButton aria-label="already-on-list" color="interactive.primary" loading={loading} onClick={onRemoveFromList} {...props}>
                <Check />
            </IconButton>
        </Tooltip>
    ) : (
        <Tooltip content='Add to list' showArrow closeDelay={0} >
            <IconButton aria-label="add-to-list" color="interactive.primary" loading={loading} onClick={onAddToList} {...props}>
                <Bookmark />
            </IconButton>
        </Tooltip>
    )

}