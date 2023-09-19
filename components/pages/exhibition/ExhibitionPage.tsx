import { DynamicImage } from '@/components/common/DynamicImage'
import { css, cx } from '@/styled-system/css'
import { flex, grid, gridItem, scrollable } from '@/styled-system/patterns'
import type { ExhibitionPagePayload } from '@/types'
import { format } from 'date-fns'

export default function ExhibitionPage({ data }: ExhibitionPagePayload) {
    const { title, startDate, endDate, imageGallery } = data ?? {}
    // console.log('image:', imageGallery && imageGallery.map((image) => image))
    return (
        <main className={css({ minHeight: '100vh', height: '100vh', width: '100vw', maxWidth: '100vw', p: '12px', bg: '#FFF1E5' })}>
            <div className={grid({ columns: 12, gap: '0' })}>
                <div className={cx(gridItem({ colStart: 1, colEnd: 4 }), css({ position: 'sticky', top: 0 }))}>
                    <div className={flex({ flexDirection: 'column', h: '100%' })}>
                        {title && <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic' })}>{title}</h3>}
                        {startDate && endDate && (
                            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'italic' })}>
                                <span>{format(new Date(startDate), 'dd MMM')}</span>
                                <span>{' — '}</span>
                                <span>{format(new Date(endDate), 'dd MMM yyyy')}</span>
                            </h3>
                        )}
                    </div>
                </div>
                <div
                    className={cx(
                        gridItem({ colStart: 4, colEnd: 13 }),
                        flex({ flexDirection: 'column' }),
                        scrollable({ direction: 'vertical', hideScrollbar: true })
                    )}
                >
                    {imageGallery && imageGallery.length > 0 && (
                        <div>
                            {imageGallery.map((image, key) => (
                                <div
                                    key={key}
                                    className={css({
                                        position: 'relative'
                                    })}
                                >
                                    <DynamicImage
                                        asset={image}
                                        mode="cover"
                                        sizes="80vw"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
