import { ExhibitionProps } from '@/types'

export type ListItemProps = {
    exhibition: ExhibitionProps
}

export default function ExhibitionListItem(props: ListItemProps) {
    const { exhibition } = props
    return (
        <div>
            <h3>{exhibition.title}</h3>
            <h3>
                <span>{exhibition.startDate}</span>
                <span>{exhibition.endDate}</span>
            </h3>
        </div>
    )
}
