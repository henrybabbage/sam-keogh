import { getTheme } from '@/sanity/lib/sanity.fetch'
import { definePreset } from '@pandacss/dev'

export default async function themePreset() {
    const theme = await getTheme()
    const { backgroundColor } = theme ?? {}
    const background = backgroundColor?.value
    return definePreset({
        theme: {
            tokens: {
                colors: {
                    current: background
                }
            }
        }
    })
}
