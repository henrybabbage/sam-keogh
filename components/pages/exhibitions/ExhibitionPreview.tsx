// import { DynamicImage } from '@/components/common/DynamicImage'
import { css } from '@/styled-system/css'

export default function ExhibitionPreview() {
    return (
        <div className={css({ position: 'relative', mt: '14vh', aspectRatio: '16/9' })}>
            <div className={css({ w: '100%', bg: 'blue.800' })}></div>
            {/* <DynamicImage
                asset={''}
                mode="cover"
                sizes="80vw"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
            /> */}
        </div>
    )
}
