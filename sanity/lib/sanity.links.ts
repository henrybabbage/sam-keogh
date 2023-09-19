export function resolveHref(
    documentType?: string,
    slug?: string,
  ): string | undefined {
    switch (documentType) {
      case 'home':
        return '/'
      case 'exhibition':
        return slug ? `/${slug}` : undefined
      default:
        console.warn('Invalid document type:', documentType)
        return undefined
    }
}
