// import { DynamicImage } from '@/components/common/DynamicImage'
import { css, cx } from '@/styled-system/css'
import { aspectRatio } from '@/styled-system/patterns'

export default function ExhibitionPreview() {
    return (
        <div className={cx(aspectRatio({ ratio: 16 / 9 }), css({ position: 'relative', mt: '14vh' }))}>
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
